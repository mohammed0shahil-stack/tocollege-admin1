import { Eye, Pencil, Trash2, Inbox } from 'lucide-react';
import { Table, Th, Td, Tr } from '../ui/Table';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';
import { initials } from '../../utils/formatters';

const STATUS_TONE = { Open: 'open', Closed: 'closed', Upcoming: 'upcoming' };

/**
 * Data table for College Management. Purely presentational — filtering
 * happens in the parent page, this just renders whatever `colleges` it's given.
 */
export default function CollegeTable({ colleges, onView, onEdit, onDelete, onClearSearch, isFiltered }) {
  if (colleges.length === 0) {
    return (
      <Table>
        <tbody>
          <tr>
            <td>
              <EmptyState
                icon={Inbox}
                title="No colleges match your search"
                description="Try a different name, state, or city — or clear your search to see everything."
                action={isFiltered && <Button variant="secondary" size="sm" onClick={onClearSearch}>Clear search</Button>}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>College</Th>
          <Th>State</Th>
          <Th>City</Th>
          <Th>Admission status</Th>
          <Th>NAAC grade</Th>
          <Th>Created</Th>
          <Th align="right">Actions</Th>
        </tr>
      </thead>
      <tbody>
        {colleges.map((c) => (
          <Tr key={c.id}>
            <Td>
              <div className="flex items-center gap-[11px]">
                <div className="w-[34px] h-[34px] rounded-[9px] bg-primary-soft text-primary-active flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {initials(c.name)}
                </div>
                <div>
                  <b className="font-semibold block">{c.name}</b>
                  <span className="text-xs text-ink-tertiary">{c.affiliation}</span>
                </div>
              </div>
            </Td>
            <Td>{c.state}</Td>
            <Td>{c.city}</Td>
            <Td>
              <Badge tone={STATUS_TONE[c.status] ?? 'neutral'} dot>{c.status}</Badge>
            </Td>
            <Td><Badge tone="grade">{c.naac}</Badge></Td>
            <Td className="tabular text-ink-secondary">{c.created}</Td>
            <Td align="right">
              <div className="flex items-center justify-end gap-0.5">
                <IconButton icon={Eye} label="View" size={7.5} onClick={() => onView(c)} />
                <IconButton icon={Pencil} label="Edit" size={7.5} onClick={() => onEdit(c)} />
                <IconButton icon={Trash2} label="Delete" size={7.5} danger onClick={() => onDelete(c)} />
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
