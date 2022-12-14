# Media

Provides methods for creating Media in everything.
Media can be uploaded to either everything cloud storage or [Arweave](https://www.arweave.org) via the [Mintbase SDK](https://github.com/Mintbase/mintbase-js).
Then records of the Media and associated Tags to the provided thingId are created in cloud storage.

</br>
</br>

## available methods

### createMediaOnCloud

Uploads array of files to everything cloud storage. 
Will automatically create Media and associated Tags from the provided thingId.

**Requires user to be connected to everything via Auth0.**

Currently only supports image/jpeg and image/png file types.

``` js
  // grab user from Auth0 (example using useUser from AuthContext for Next.js)
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
    const { urls } = await createMediaOnCloud(files, args);
  } catch(error) {
    // handle error in creating media
  }
```

</br>

---

### createMediaOnBlockchain

Uploads array of files to [Arweave](https://www.arweave.org) via [Mintbase SDK](https://github.com/Mintbase/mintbase-js). 
Will automatically create Media and associated Tags from the provided thingId.

``` js
  // files for upload
  const files: File[] = ....;
  
  // thingId should be provided and valid
  const args: CreateMediaBlockchainArgs = {
    thingId
  }

  try {
    // returns urls, but no further action required
    const { urls } = await createMediaOnBlockchain(files, args);
  } catch(error) {
    // handle error in creating media
  }
```

</br>
