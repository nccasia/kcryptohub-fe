export const profileApi = {
  getImageUrl: (url: string) => {
    if (!url) {
      return "";
    }
    if (url.includes("http")) {
      return url;
    } else {
      return `${process.env.API_URL}/api/profile/getImage/${url}`;
    }
  },
};
