// Date formatting utilities
export const formatDate = (
  date: string | Date,
  formatStr: string = "yyyy-MM-dd"
): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return parsedDate.toLocaleDateString();
};

// String manipulation utilities
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// API request helpers
export const createApiUrl = (
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string>
): string => {
  const url = new URL(endpoint, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};
