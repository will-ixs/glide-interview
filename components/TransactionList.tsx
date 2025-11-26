"use client";

import { trpc } from "@/lib/trpc/client";

interface TransactionListProps {
  accountId: number;
}

export function TransactionList({ accountId }: TransactionListProps) {
  const { data: transactions, isLoading } = trpc.account.getTransactions.useQuery({ accountId });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-(color:--color-mg) shadow overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-(color:--color-fg)">
        <thead className="bg-(color:--color-mg)">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium color(--color-text-primary) uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium color(--color-text-primary) uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium color(--color-text-primary) uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium color(--color-text-primary) uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium color(--color-text-primary) uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-(color:--color-mg) divide-y divide-(color:--color-fg)">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm color(--color-text-primary)">
                {formatDate(transaction.createdAt!)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm color(--color-text-primary)">
                <span className={`capitalize ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm color(--color-text-secondary)">
                {transaction.description || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm color(--color-text-secondary)">
                <span className={transaction.type === "deposit" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "deposit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
