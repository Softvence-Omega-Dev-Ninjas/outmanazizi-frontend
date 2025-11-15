export function ProvidersTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm" style={{ width: "max-content" }}>
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[200px]">
              Provider
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">
              Contact
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">
              Services
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">
              Rating
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Status
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Joined
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
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-40 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-36 bg-muted animate-pulse rounded" />
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <div className="h-5 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-5 w-16 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="space-y-1">
                  <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
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
