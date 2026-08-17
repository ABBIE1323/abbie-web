"use client";

import { FormEvent, useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function createSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0E00-\u0E7F-]/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(createSlug(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "เพิ่มบทความไม่สำเร็จ");
      }

      setMessage("เพิ่มบทความสำเร็จ");
      setTitle("");
      setSlug("");
      setDescription("");
      setContent("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาด"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="category-page">
      <form onSubmit={handleSubmit} className="category-card">
        <h1>เพิ่มบทความ</h1>

        <div>
          <label>ชื่อบทความ</label>
          <input
            type="text"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
          />
        </div>

        <div>
          <label>slug</label>
          <input
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div>
          <label>รายละเอียด</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        {message && (
          <p>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "กำลังบันทึก..." : "เพิ่มบทความ"}
        </button>
      </form>
    </div>
  );
}