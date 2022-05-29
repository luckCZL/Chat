import { observable, action } from 'mobx';
import { pageParams } from '@/Interface/common';
class CommonStore {
  @observable common = new pageParams();

  @action getisNavigation(): boolean {
    return this.common.isNavigation || false;
  }

  @action setisNavigation(value: boolean): void {
    this.common.isNavigation = value;
  }
}
export default CommonStore;
