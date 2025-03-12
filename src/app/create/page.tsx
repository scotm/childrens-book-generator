"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateStory() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    childPhoto: null,
    readingLevel: "beginner",
    petName: "",
    petType: "",
    petPhoto: null,
    storyTheme: "",
    additionalDetails: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [fieldName]: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement API call to generate story
      // For now, we'll just redirect to a mock result
      router.push("/story/preview");
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create a New Story</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Child Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">Child's Name</Label>
                  <Input 
                    id="childName" 
                    name="childName" 
                    placeholder="Enter child's name" 
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">Child's Age</Label>
                  <Input 
                    id="childAge" 
                    name="childAge" 
                    placeholder="Enter child's age" 
                    value={formData.childAge}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childPhoto">Upload Child's Photo (Optional)</Label>
                <Input 
                  id="childPhoto" 
                  name="childPhoto" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "childPhoto")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="readingLevel">Reading Level</Label>
                <Select 
                  name="readingLevel"
                  value={formData.readingLevel} 
                  onValueChange={(value) => handleSelectChange(value, "readingLevel")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reading level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (Ages 3-5)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (Ages 6-8)</SelectItem>
                    <SelectItem value="advanced">Advanced (Ages 9-12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pet Information (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="petName">Pet's Name</Label>
                  <Input 
                    id="petName" 
                    name="petName" 
                    placeholder="Enter pet's name" 
                    value={formData.petName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petType">Pet Type</Label>
                  <Input 
                    id="petType" 
                    name="petType" 
                    placeholder="Cat, Dog, etc." 
                    value={formData.petType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="petPhoto">Upload Pet's Photo (Optional)</Label>
                <Input 
                  id="petPhoto" 
                  name="petPhoto" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "petPhoto")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Story Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storyTheme">Story Theme</Label>
                <Select 
                  name="storyTheme"
                  value={formData.storyTheme} 
                  onValueChange={(value) => handleSelectChange(value, "storyTheme")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="underwater">Underwater</SelectItem>
                    <SelectItem value="dinosaurs">Dinosaurs</SelectItem>
                    <SelectItem value="jungle">Jungle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                <Textarea 
                  id="additionalDetails" 
                  name="additionalDetails" 
                  placeholder="Any other details you'd like to include in the story" 
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "Generating Story..." : "Generate Story"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}