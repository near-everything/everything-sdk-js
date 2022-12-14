# @everything-sdk-js/data

Provides methods for reading data from the [everything mesh]().

_IN PROGRESS_: currently reading data directly from everything api or mintbase indexer, mesh in development

</br>
</br>

## available methods

---

### getThings

``` js
  const { data, error} = await getThings();
```

Fetches all available thing data from the mesh. This includes all public blockchain data from the [Mintbase Indexer](), all public data from [everything cloud storage](), and any available data from access token (if provided).

</br>

---

### getThingById

``` js
  const { data, error} = await getThingById(thingId);
```

Fetches all available data for provided thing Id from the mesh. This includes any public blockchain data from the [Mintbase Indexer](), any public data from [everything cloud storage](), and any available data from access token (if provided).

</br>

---

### getThingsByOwner

``` js
  const { data, error} = await getThingsByOwner(ownerId);
```

Fetches all available thing data for provided owner Id from the mesh. This includes any public blockchain data from the [Mintbase Indexer](), any public data from [everything cloud storage](), and any available data from access token (if provided).

</br>

---

### getAttributes

``` js
  const { data, error} = await getAttributes();
```

Fetches all available attributes for describing things from the mesh.

</br>

---

### getAttributeById

``` js
  const { data, error} = await getAttributeById(attributeId);
```

Fetches all data from the mesh associated with provided attributeId.

</br>