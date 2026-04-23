import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Heart, Shield, Settings } from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useGRP();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    city: 'San Francisco, CA',
    about: 'Love exploring the city!',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would call an API to save the profile
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-grp-foreground/90">Manage your account</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-grp hover:bg-white/90"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => navigate('/home')}
                >
                  ← Back
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Avatar & Basic Info */}
        <Card className="p-6 mb-6 border-border/50">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {formData.name.charAt(0)}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    placeholder="About"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{formData.name}</h2>
                  <p className="text-muted-foreground mb-3">{formData.about}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-grp" />
                      <span className="text-sm text-muted-foreground">Verified Member</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-grp" />
              <p className="text-sm font-medium text-muted-foreground">Email</p>
            </div>
            {isEditing ? (
              <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            ) : (
              <p className="text-foreground font-medium">{formData.email}</p>
            )}
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-5 h-5 text-grp" />
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
            </div>
            {isEditing ? (
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            ) : (
              <p className="text-foreground font-medium">{formData.phone}</p>
            )}
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-grp" />
              <p className="text-sm font-medium text-muted-foreground">Location</p>
            </div>
            {isEditing ? (
              <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            ) : (
              <p className="text-foreground font-medium">{formData.city}</p>
            )}
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-grp" />
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            </div>
            <p className="text-foreground font-medium">Jan 2026</p>
          </Card>
        </div>

        {/* Account Settings */}
        <Card className="p-6 border-border/50 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Heart className="w-4 h-4" />
              Emergency Contacts
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Shield className="w-4 h-4" />
              Privacy Settings
            </Button>
          </div>
        </Card>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
