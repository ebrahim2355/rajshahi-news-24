type Props = {
  id?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function SectionTitle({ id, children, action }: Props) {
  return (
    <div
      id={id}
      className="mb-6 flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <h2 className="text-xl font-bold tracking-tight text-brand sm:text-2xl">
        {children}
      </h2>
      {action}
    </div>
  );
}
