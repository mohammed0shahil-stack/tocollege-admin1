import { Settings as SettingsIcon } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function Settings() {
  return (
    <PlaceholderPage
      icon={SettingsIcon}
      title="Settings"
      description="Workspace, team and notification preferences will live here."
    />
  );
}
