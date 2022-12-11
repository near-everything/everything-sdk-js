import { readFileSync } from 'fs';
import { resolve } from 'path';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { execute, mint, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk/src';
import { uploadFileToArweave } from '@mintbase-js/storage';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { createThing } from "@everything-sdk-js/sdk";

import { connect } from "../../../../mintbase-js/packages/auth/src";
import { authenticatedKeyStore } from "../../../../mintbase-js/packages/testing/src";


test('create thing and upload media to blockchain (near and arweave)', async () => {

  const keyStore = await authenticatedKeyStore(['everything_alice.testnet']);
  const signingAccount = await connect('everything_alice.testnet', keyStore);

  // call create thing
  const thingId = await createThing({});
  // assert that we got a receipt back, which could just be checking the returns

  // call create media with thing id

  // assert that file is uploaded to arweave?, should get a mediaId?

  // upload media to arweave
  const media = readFileSync(resolve(__dirname + '/../test-upload.jpg'));
  const { id: mediaId, mimeType } = await uploadFileToArweave(
    media,
    'test-upload.jpg',
  );

  const metadata = {
    media: `https://arweave.net/${mediaId}`,
    media_type: mimeType,
    media_size: media.length,
  };

  // upload metadata json
  const { id: referenceId } = await uploadFileToArweave(
    Buffer.from(JSON.stringify(metadata)),
    'metadata.json',
  );
  console.log('got a reference!', referenceId);

  const result = (await execute(
    {
      ...mint({
        nftContractId: TEST_TOKEN_CONTRACT,
        ownerId: 'everything_bob.testnet',
        reference: metadata.media,
      }),
      gas: MAX_GAS,
      deposit: ONE_YOCTO,
    },
    { account: signingAccount },
  )) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});