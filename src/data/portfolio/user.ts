import type { User } from "@/types/user"

export const USER: User = {
  firstName: "Wistant",
  lastName: "Kode",
  displayName: "Wistant Kode",
  username: "wistant",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer",
    "Open Source Contributor",
  ],
  address: "Yaounde , Cameroon",
  phoneNumber: "wwwueuuAAXCV", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "ZGFpQGNoYW5oZGFpLmNvbQ==", // base64 encoded
  website: "https://wistant.me",
  jobTitle: "Software Architect/Engineer",
  jobs: [
    {
      title: "Design Engineer",
      company: "shadcncraft",
      website: "https://shadcncraft.com?atp=ncdai",
      experienceId: "shadcncraft",
    },
    {
      title: "Founder",
      company: "Quaric",
      website: "https://quaric.com",
      experienceId: "quaric",
    },
  ],
  about: `
- Design Engineer with 5+ years of experience, known for pixel-perfect execution and strong attention to small details.
- Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted personal projects.
- Creator of [chanhdai.com](https://github.com/ncdai/chanhdai.com) (1.8k stars), [React Wheel Picker](https://react-wheel-picker.chanhdai.com) (24k+ weekly downloads, ▲Vercel OSS Program), and [ZaDark](https://zadark.com) (80k+ downloads, 30k+ users) — peak metrics.
`,
  avatar: "https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp",
  avatarVariants: {
    lightOff: "https://assets.chanhdai.com/images/avatar-light-off.webp",
    lightOn: "https://assets.chanhdai.com/images/avatar-light-on.webp",
    darkOff: "https://assets.chanhdai.com/images/avatar-dark-off.webp",
    darkOn: "https://assets.chanhdai.com/images/avatar-dark-on.webp",
  },
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?t=1778602757",
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3",
  timeZone: "Asia/Ho_Chi_Minh",
  keywords: [
    "ncdai",
    "nguyenchanhdai",
    "nguyen chanh dai",
    "chanhdai",
    "chanh dai",
    "iamncdai",
    "quaric",
    "zadark",
    "nguyễn chánh đại",
    "chánh đại",
  ],
  dateCreated: "2026-05-02", // YYYY-MM-DD
}
