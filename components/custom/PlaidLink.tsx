import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { StyledString } from "next/dist/build/swc";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
      const getLinkToken = async () => {
        const data = await createLinkToken(user);
        setToken(data?.linkToken)
      }  
      getLinkToken()
    }, [user])

    

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string) => {
    await exchangePublicToken({
        publicToken: public_token,
        user
    })
    router.push('/')
  },[user])

  
    

const config: PlaidLinkOptions = {
    token,
    onSuccess
}

const {open, ready } = usePlaidLink(config)

  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary" 
        disabled={!ready}
        onClick={() => open()}
        >Connect Bank</Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost" onClick={() => open()}>Connect Bank</Button>
      ) : (
        <Button className="plaidlink-default" onClick={() => open()}>
          <Image src="/icons/connect-bank.svg" alt="connect" height={24} width={24} />
          <p className="font-semibold text-black-2 text-[16px] xl:block">Connect Bank</p></Button>
      )}
    </>
  );
};

export default PlaidLink;
