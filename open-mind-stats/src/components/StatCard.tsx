interface Props {
  label: string;
  value: number | string;
  color?: string;
}

export default function StatCard({ label, value, color = 'text-slate-800' }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}