import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('');
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        // push to the homepage
        router.push('/');
    }, [user])

    const config : PlaidLinkOptions = {
        token,
        onSuccess,
    }

    const {open, ready} = usePlaidLink(config);
  return (
    <>
        {variant === 'primary' ? (
            <Button className='plaidlink-primary' onClick={() => open()} disabled={!ready}>
                Connect to a bank
            </Button>
        ) : variant === 'ghost' ? (
            <Button>
                Connect to a bank
            </Button>
        ) : (
            <Button>
                Connect to a bank
            </Button>
        )}
    </>
  )
}

export default PlaidLink