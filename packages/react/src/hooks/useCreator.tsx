// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useWallet } from '../../../../../mintbase-js/packages/react/lib';
// import { useState } from 'react';
// import { createThing, createMedia } from "@everything-sdk-js/sdk";

// type CreatorHookReturn = {
//   loading: boolean;
//   error: any;
//   data: any;
//   methods: any;
// };


// export const useMinter = (args: any): CreatorHookReturn => {
//   const { selector, activeAccountId } = useWallet();
//   const { user } = useUser();
//   const { nftContractId } = args;
//   const [data, setData] = useState();
//   const [error, setError] = useState();

//   const [loading, setLoading] = useState(false);

//   const handleCreateThing = async (args: any): Promise<void> => {
//     setLoading(true);

//     const createThingData = {
//       user,
//       wallet: await selector.wallet(),
//       mintArgs: { nftContractId: nftContractId, reference: "", ownerId: activeAccountId },
//       storage: args.storage,
//       characteristics: args.characteristics,
//       files: args.files,
//     };

//     const { data, error } = await createThing(createThingData)

//     if (error !== undefined) {
//       setError(error);
//     } else {
//       setData(data);
//       await createMedia(data.thingId, args);
//     }

//     setLoading(false);
//   };

//   return {
//     loading,
//     error,
//     data,
//     methods: {
//       createThing: handleCreateThing
//     },
//   };
// };