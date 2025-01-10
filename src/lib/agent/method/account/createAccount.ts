import { ec, stark, hash, CallData } from "starknet";

export const CreateOZAccount = async () => {
  try {
    const privateKey = stark.randomAddress();
    console.log("Random private Key :" + privateKey);
    const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
    console.log("publicKey=", starkKeyPub);

    const OZaccountClassHash =
      "0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f";
    const OZaccountConstructorCallData = CallData.compile({
      publicKey: starkKeyPub,
    });
    const OZcontractAddress = hash.calculateContractAddressFromHash(
      starkKeyPub,
      OZaccountClassHash,
      OZaccountConstructorCallData,
      0
    );
    return JSON.stringify({
      status: "success",
      wallet: "Open Zeppelin",
      new_account_publickey: OZcontractAddress,
      new_accout_privatekey: privateKey,
      precalculate_address: OZcontractAddress,
    });
  } catch (error) {
    return JSON.stringify({
      status: "failure",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const CreateArgentAccount = async () => {
  try {
    const argentXaccountClassHash =
      "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";

    // Generate public and private key pair.
    const privateKeyAX = stark.randomAddress();
    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);

    // Calculate future address of the ArgentX account
    const AXConstructorCallData = CallData.compile({
      owner: starkKeyPubAX,
      guardian: "0x0",
    });
    const AXcontractAddress = hash.calculateContractAddressFromHash(
      starkKeyPubAX,
      argentXaccountClassHash,
      AXConstructorCallData,
      0
    );
    return JSON.stringify({
      status: "success",
      new_account_publickey: AXcontractAddress,
      new_account_privatekey: privateKeyAX,
      precalculate_address: AXcontractAddress,
      wallet: "Argent",
    });
  } catch (error) {
    return JSON.stringify({
      status: "failure",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
