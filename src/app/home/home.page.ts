import { Component, OnInit } from '@angular/core';
import { ApiPromise } from '@polkadot/api';
import { ScProvider } from '@polkadot/rpc-provider';
import * as Sc from '@substrate/connect';

import '@polkadot/api-augment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  latestHash: string = '';
  latestBlock: string = '';
  parentHash: string = '';
  stateRoot: string = '';
  network: string = '';

  constructor() {}

  async ngOnInit() {
    this.network = Sc.WellKnownChain.polkadot;
    const provider = new ScProvider(Sc, Sc.WellKnownChain.polkadot);
    await provider.connect();
    const polkadotApi = await ApiPromise.create({ provider });
    await polkadotApi.rpc.chain.subscribeNewHeads((lastHeader) => {
      this.latestHash = lastHeader.hash.toString();
      this.stateRoot = lastHeader.stateRoot.toString();
      this.latestBlock = lastHeader.number.toString();
      this.parentHash = lastHeader.parentHash.toString();
    });
  }
}
