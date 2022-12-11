import { readFileSync } from 'fs';
import { resolve } from 'path';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { execute, mint, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk/src';
import { uploadFileToArweave } from '@mintbase-js/storage';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { createThing } from "@everything-sdk-js/sdk";

import { connect } from "../../../../mintbase-js/packages/auth/src";
import { authenticatedKeyStore } from "../../../../mintbase-js/packages/testing/src";


test('create thing and upload media to cloud', async () => {

  // call create thing with storage CLOUD
  const thingId = await createThing({});
  // assert that we got a thing id back, which could just be checking the returns

  // call create media with thing id

  // assert that file is uploaded to cloud, should get a mediaId?

});