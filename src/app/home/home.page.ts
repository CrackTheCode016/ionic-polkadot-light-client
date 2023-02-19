import { Component, OnInit } from '@angular/core';
import { ApiPromise } from '@polkadot/api';
import { ScProvider } from '@polkadot/rpc-provider';
import * as Sc from '@substrate/connect';
// Needed for polkadot-js
import '@polkadot/api-augment';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { Capacitor } from '@capacitor/core';

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
  network: string = 'polkadot';
  synced: boolean = false;

  constructor() {}

  async ngOnInit() {
    await this.callAndSync();
    if (Capacitor.isNativePlatform()) {
      App.addListener('appStateChange', async ({ isActive }) => {
        if (isActive) {
          return;
        }
        const taskId = await BackgroundTask.beforeExit(async () => {
          await this.callAndSync();
          BackgroundTask.finish({ taskId });
        });
      });
    }
  }

  async callAndSync() {
    this.synced = false;
    let selectedNetwork: Sc.WellKnownChain = this.network as Sc.WellKnownChain;
    const provider = new ScProvider(Sc, selectedNetwork);
    await provider.connect();
    const polkadotApi = await ApiPromise.create({ provider });
    await polkadotApi.rpc.chain.subscribeNewHeads((lastHeader) => {
      this.latestHash = lastHeader.hash.toString();
      this.stateRoot = lastHeader.stateRoot.toString();
      this.latestBlock = lastHeader.number.toString();
      this.parentHash = lastHeader.parentHash.toString();
      this.synced = true;
    });
  }
}
