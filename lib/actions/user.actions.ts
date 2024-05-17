'use server'

import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../server/appwrite"
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async (userDat: SignUpParams) =>{
  // destructing SignUpParams
  const { email, password, firstName, lastName } = userDat;
    try {
        // Create a user account
        // Mutation / DB/ Fetch
        //  This method takes the email and password as arguments and returns a session object. We then set the session secret in a cookie (and redirect the user to the account page).
        const { account } = await createAdminClient();

        // create an account by taking Admin power to create
        const newUserAccount = await account.create(ID.unique(), email, password, `${lastName} ${firstName}`); // Tên tiếng Việt
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        // we declare this function in lib/utils.ts
        // In nextJS we cannot pass large OBJECT through server action, that's why we stringnify first
        return parseStringify(newUserAccount);
      
    } catch (err) {
        console.log("Error ", err);
    }
}

export const signIn = async () =>{
    try {
        // take out the user DB
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
