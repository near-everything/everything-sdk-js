# Thing

Provides methods for creating Things in everything.
Things are uploaded to everything cloud storage.

_IN PROGRESS_: More options in progress, Arweave upload in development, will offer offline storage.

</br>
</br>

## available methods

### createThing

Creates a Thing on the specified storage service (currently only supports cloud storage).

Will return a thingId.

**Requires user to be connected to everything via Auth0.**

Currently only supports image/jpeg and image/png file types.

``` js
  // grab user from Auth0 (example using useUser from UserProvider from Auth0/next.js)
  const { user } = useUser();

  // files for upload
  const files: File[] = ....;
  
  // thingId should be provided and valid
  const args: CreateMediaCloudArgs = {
    user,
    thingId
  }

  try {
    // returns urls, but no further action required
    const { urls } = await createThing(files, args);
  } catch(error) {
    // handle error in creating media
  }
```

</br>

---

### mintThing

Provided an id for an existing Thing, will mint reference on [NEAR Protocol](https://near.org) via [Mintbase SDK](https://github.com/Mintbase/mintbase-js). Can be used for history of ownership and marketplace transactions.

**Requires user to be connected to NEAR.**


``` js
  // need wallet and owner account id (example using useWallet from Mintbase WalletContextProvider)
  const { selector, activeAccountId } = useWallet();
  
  const wallet = await selector.wallet();

  // thingId should be provided and valid
  const args: CreateThingBlockchainArgs = {
    wallet,
    ownerId: activeAccountId,
    nftContractId: "everything.mintspace2.testnet" // generate your own on Mintbase
  }

  try {
    // returns final execution outcome, but no further action required
    const response = await mintThing(thingId, args);
  } catch(error) {
    // handle error in minting thing
  }
```

</br>
