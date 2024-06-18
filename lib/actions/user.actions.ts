'use server'

import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../server/appwrite"
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASEY_ID,
  APPWRITE_USER_COLLECTION_ID: USERY_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANKY_COLLECTION_ID,
} = process.env;

export const signUp = async (userDat: SignUpParams) =>{
  // destructing SignUpParams
  const { email, password, firstName, lastName } = userDat;
  let newUserAccount;
    try {
        // Create a user account
        //  This method takes the email and password as arguments and returns a session object. We then set the session secret in a cookie (and redirect the user to the account page).
        const { account, database } = await createAdminClient();

        // create an account by taking Admin power to create
        newUserAccount = await account.create(ID.unique(), email, password, `${lastName} ${firstName}`); // Tên tiếng Việt

        if(!newUserAccount){
          throw new Error('Error trong lỗi tạo USER/ creating user')
        }

        // dwollaCustomerUrl - payment processor
        const dwollaCustomerUrl = await createDwollaCustomer({
          ...userDat,
          type: 'personal',
        });

        if(!dwollaCustomerUrl){
          throw new Error('Error lỗi TẠO dwolla customer')
        }

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        // fetch the user's account info to the OFFICIAL DATABASE
        const newUser = await database.createDocument(
          DATABASEY_ID!,
          USERY_COLLECTION_ID!,
          ID.unique(),
          {
            ...userDat,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl,
          }
        )

        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        // we declare this function in lib/utils.ts
        // In nextJS we cannot pass large OBJECT through server action, that's why we stringnify first
        return parseStringify(newUser);
      
    } catch (err) {
        console.log("Error ", err);
    }
}

export const signIn = async ({email, password}: signInProps) =>{
    try {
        // Mutation / DB/ Fetch
        const { account } = await createAdminClient();

        // take the email and password from sign-in AuthForm, fetch here to excute to take out user's data
        const response = await account.createEmailPasswordSession(email, password);
        
        return parseStringify(response);
    } catch (err) {
        console.log("Error ", err);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () =>{
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async(user: User) => {
  try {
    const tokenParams = {
      user: {client_user_id: user.$id},
      client_name: user.name,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({linkToken: response.data.link_token});
  } catch (error) {
    console.log(error);
  }
}

export const createBankAccount = async ({userId, bankId, accountId, accessToken, fundingSourceUrl, sharableId,}:createBankAccountProps) => {
  try {
    const {database} = await createAdminClient();
    const bankAccount = await database.createDocument(
      DATABASEY_ID!,
      BANKY_COLLECTION_ID!,
      ID.unique(),
      { userId, bankId, accountId, accessToken, fundingSourceUrl, sharableId,},
    )

    return parseStringify(bankAccount);
  } catch (error) {
    
  }
}

// exchange 'public token' FOR 'existing access token' of ours, then FOR token that do BANK ACCOUNT INFO
export const exchangePublicToken = async({publicToken, user} : exchangePublicTokenProps) => {
    try {
      // exchange public token for access token and item ID
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken
      });

      const accessToken = response.data.access_token;
      const itemId = response.data.item_id;

      // Get account ifo from Plaid using access token
      const accountsResponse = await plaidClient.accountsGet({access_token: accessToken});
      const accountData = accountsResponse.data.accounts[0];

      // Create a processor token for DWOLLA using the access_token and accountID
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };
      const processorTokenResponse = await plaidClient.processorTokenCreate(request);
      const processorToken = processorTokenResponse.data.processor_token;

      // CREATE FUNDING SOURCE URL for the acc that use DWOLLA, properly WONT USE IT:
      // need to fetch: customerID, processor_token, bank_name
      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      });

      // check if there is fundingSourceURl or not?
      if (!fundingSourceUrl){
        throw Error;
      }

      await createBankAccount({
        userId: user.$id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        sharableId: encryptId(accountData.account_id),
      });

      revalidatePath("/"); // reflect the changes

      // return a success message
      return parseStringify({
        publicTokenExchange: "complete",
      });
    } catch (error) {
      console.error("Errrrrror occcur while creating exchanging token:", error);
    }
}