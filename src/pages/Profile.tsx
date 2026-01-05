import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Edit2, MapPin, Briefcase, Calendar, Plus, 
  Award, FolderKanban, ExternalLink, Save, X 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(currentUser);

  const getAvailabilityStyles = () => {
    switch (user.availability) {
      case 'available':
        return 'bg-success/20 text-success border-success/30';
      case 'open':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'busy':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl shadow-card overflow-hidden mb-8"
          >
            {/* Cover */}
            <div className="h-32 gradient-hero relative">
              <Button
                variant="glass"
                size="sm"
                className="absolute bottom-4 right-4"
              >
                <Camera className="w-4 h-4 mr-2" />
                Edit Cover
              </Button>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32 ring-4 ring-card shadow-lg">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                {/* Name & Actions */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    <p className="text-muted-foreground">{user.title}</p>
                  </div>
                  <Button
                    variant={isEditing ? 'outline' : 'gradient'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{user.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", getAvailabilityStyles())}
                >
                  {user.availability}
                </Badge>
              </div>

              {/* Bio */}
              {isEditing ? (
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    rows={3}
                  />
                </div>
              ) : (
                <p className="text-foreground/80">{user.bio}</p>
              )}

              {/* Skills */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-accent">
                      {skill}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="h-7 rounded-full">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Skill
                    </Button>
                  )}
                </div>
              </div>

              {/* Culture Preferences */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Work Culture Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {user.workCulturePreferences.map((pref) => (
                    <Badge key={pref} variant="outline">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects & Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FolderKanban className="w-5 h-5 text-primary" />
                    Projects & Milestones
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.projects.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <FolderKanban className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">No projects added yet</p>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  ) : (
                    user.projects.map((project) => (
                      <div key={project.id} className="p-4 bg-muted/50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          <Badge variant={project.status === 'ongoing' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        {project.link && (
                          <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Project
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="w-5 h-5 text-match" />
                    Achievements
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.achievements.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">No achievements added yet</p>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Achievement
                      </Button>
                    </div>
                  ) : (
                    user.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Save Button (when editing) */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2"
            >
              <Button variant="gradient" size="lg" onClick={() => setIsEditing(false)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
