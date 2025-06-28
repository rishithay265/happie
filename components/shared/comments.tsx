"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user?: { id: number; name: string; profile_picture: string | null };
  investor?: { id: number; name: string; profile_picture: string | null };
}

export default function Comments({ projectId }: { projectId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments?projectId=${projectId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [projectId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await axios.post("/api/comments", { projectId, content });
      const res = await axios.get(`/api/comments?projectId=${projectId}`);
      setComments(res.data);
      setContent("");
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="border rounded-md p-3 space-y-1">
            <div className="text-sm font-medium">
              {c.user?.name || c.investor?.name || "Anonymous"}
            </div>
            <div className="text-sm">{c.content}</div>
          </div>
        ))}
      </div>
      {session && (
        <form onSubmit={submit} className="space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit" disabled={loading}>
            Post
          </Button>
        </form>
      )}
    </div>
  );
}
