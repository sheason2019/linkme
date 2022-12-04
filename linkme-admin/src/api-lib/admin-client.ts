/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年12月4日 21:7:24.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

export interface SatisticsItem {
  Label: string;
  Count: number;
}
export interface HomepageSatisticsGroup {
  UserCounts: SatisticsItem[];
  ConversationCounts: SatisticsItem[];
  MessagesCounts: SatisticsItem[];
  UVCounts: SatisticsItem[];
}
export class AdminClient extends OmiClientBase {
  GetHomepageSatistics() {
    const url = "Admin.HomepageSatistics";
    const method = "Get";
    return this.request<HomepageSatisticsGroup>(url, method, {});
  }
}
