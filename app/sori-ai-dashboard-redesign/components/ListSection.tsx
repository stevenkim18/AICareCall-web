'use client';

interface ListItem {
  id: number;
  type: 'care_tip' | 'action_item' | 'trend' | 'notification' | 'summary';
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

interface ListSectionProps {
  items: ListItem[];
  variant?: 'default' | 'compact' | 'grid';
}

export function ListSection({ items, variant = 'default' }: ListSectionProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-amber-200 bg-amber-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-slate-200 bg-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border-2 ${getPriorityColor(item.priority)} hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-slate-900 truncate">{item.title}</h4>
                  <span className="text-xs font-bold text-slate-500">{formatDate(item.date)}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border ${getPriorityColor(item.priority)} hover:shadow-sm transition-all cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <div className="text-lg">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="text-xs font-black text-slate-900 truncate">{item.title}</h4>
                  <span className="text-xs font-bold text-slate-500">{formatDate(item.date)}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // default variant
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-lg border-2 ${getPriorityColor(item.priority)} hover:shadow-md transition-all cursor-pointer`}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                <span className="text-xs font-bold text-slate-500">{formatDate(item.date)}</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

