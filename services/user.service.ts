import { ajax } from "../ajax-util";

export class UserService {
  public static async retrieveUserProfile(lineUserId: string): Promise<string> {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
      },
    }

    let displayName = '';

    try {
      const response = await ajax('get', `https://api.line.me/v2/bot/profile/${lineUserId}`, options);
      const profile = response.body

      displayName = profile.displayName ? profile.displayName : '使用者無名稱';
      const pictureUrl = profile.pictureUrl ? profile.pictureUrl : '';

      console.log('----------- User Profile -----------');
      console.log(`displayName = ${displayName}`);
      console.log(`pictureUrl = ${pictureUrl}`);
      console.log('------------------------------------');

    } catch (error: unknown) {
      console.error(error);
    }

    return displayName;
  };
}
