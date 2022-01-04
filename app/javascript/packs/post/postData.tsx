/****************************************
 * 投稿の定義クラス
 ****************************************/
export class PostData {
  /** ポストID */
  post_id: number;
  /** カテゴリID */
  category_id: string;
  /** 非表示フラグ */
  hide_flag: string;
  /** IPアドレス */
  ip: string;
  /** 名前 */
  name: string;
  /** 名前 */
  mail: string;
  /** 件名 */
  subject: string;
  /** 本文 */
  text: string;
  /** 投稿日時 */
  post_date: Date;
  /** クライアントIPアドレス */
  clientIp: string;
}