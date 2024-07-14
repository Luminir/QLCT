export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/tai-khoan-cua-toi",
    label: "Tài khoản của tôi",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/phan-tich",
    label: "Phân tích",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/lich-su-giao-dich",
    label: "Lịch sử giao dịch",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/chuyen-tien",
    label: "Chuyển tiền",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-purple-900",
    backgroundColor: "bg-pink-500",
    textColor: "text-white",
    chipBackgroundColor: "bg-purple-500",
  },
  Payment: {
    borderColor: "border-success-900",
    backgroundColor: "bg-green-600",
    textColor: "text-white",
    chipBackgroundColor: "bg-green-500",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-900",
    backgroundColor: "bg-red-700",
    textColor: "text-white",
    chipBackgroundColor: "bg-red-500",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-800",
    textColor: "text-white",
    chipBackgroundColor: "bg-gray-500",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-green-800",
    textColor: "text-white",
    chipBackgroundColor: "bg-green-500",
  },
  Travel: {
    borderColor: "bg-blue-900",
    backgroundColor: "bg-blue-500",
    textColor: "text-white",
    chipBackgroundColor: "bg-blue-500",
  },
  default: {
    borderColor: "bg-pink-900",
    backgroundColor: "bg-pink-500",
    textColor: "text-white",
    chipBackgroundColor: "bg-pink-500",
  },
};
