export const alert = {
  base:
    "lib:flex lib:w-full lib:overflow-hidden lib:px-3 lib:py-2.5 lib:rounded-md",
  icon:
    "lib:inherit box-content lib:flex-shrink-0 lib:mr-2 lib:w-4 lib:h-4 lib:py-0.5",
  body: {
    base: "lib:flex lib:text-sm",
    mobile: "lib:flex-col",
  },
  title: "lib:text-gray-800 font-medium",
  description: {
    base: "lib:text-gray-600 font-light",
    desktop: "lib:ml-2",
    mobile: "lib:mt-0.5",
  },
  actionsWrapper: { base: "lib:ml-auto flex", desktop: "lib:items-center" },
  actionButton: {
    base: "lib:shadow-none",
    desktop: "lib:-my-1.5",
    mobile: "lib:-ml-3 lib:mt-0.5",
  },
  closeButton: "lib:-my-1.5 lib:-mr-2 lib:shadow-none",
  status: {
    neutral: {
      base: "lib:bg-gray-100",
      icon: "lib:text-gray-800",
      actionButton: "lib:text-gray-800 lib:hover:bg-gray-200",
      closeButton: "lib:text-gray-800 lib:hover:bg-gray-200",
    },
    info: {
      base: "lib:bg-blue-50",
      icon: "lib:text-blue-600",
      actionButton: "lib:text-blue-600 lib:hover:bg-blue-100",
      closeButton: "lib:text-blue-600 lib:hover:bg-blue-100",
    },
    success: {
      base: "lib:bg-green-50",
      icon: "lib:text-green-600",
      actionButton: "lib:text-green-600 lib:hover:bg-green-100",
      closeButton: "lib:text-green-600 lib:hover:bg-green-100",
    },
    warning: {
      base: "lib:bg-orange-50",
      icon: "lib:text-orange-600",
      actionButton: "lib:text-orange-600 lib:hover:bg-orange-100",
      closeButton: "lib:text-orange-600 lib:hover:bg-orange-100",
    },
    error: {
      base: "lib:bg-red-50",
      icon: "lib:text-red-600",
      actionButton: "lib:text-red-600 lib:hover:bg-red-100",
      closeButton: "lib:text-red-600 lib:hover:bg-red-100",
    },
  },
};
