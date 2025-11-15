export function OrdersTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm" style={{ width: "max-content" }}>
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Order ID
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">
              Service
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[200px]">
              Description
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">
              Budget
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Status
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[80px]">
              Bids
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Created
            </th>
            <th className="h-10 px-2 text-right align-middle font-medium whitespace-nowrap min-w-[100px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-6 w-8 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </td>
              <td className="p-2 align-middle whitespace-nowrap text-right">
                <div className="flex gap-2 justify-end">
                  <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
