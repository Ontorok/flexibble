"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import GoogleIcon from "@/assets/icons/google.png";
import GithubIcon from "@/assets/icons/github.png";
import Image from "next/image";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

type ProviderType = "";

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const getProviderIcon = (providerName: string) => {
    switch (providerName) {
      case "google":
        return <Image src={GoogleIcon} width={40} height={40} alt={providerName} />;
      case "github":
        return <Image src={GithubIcon} width={40} height={40} alt={providerName} />;

      default:
        return providerName;
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, i) => (
          <button key={i} onClick={() => signIn(provider.id)} className="m-2 mr-0">
            {getProviderIcon(provider.id)}
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
