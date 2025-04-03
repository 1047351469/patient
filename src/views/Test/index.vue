<script setup lang="ts">
function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportAll() {
  const files = {
    "a.txt": "content A",
    "b.txt": "content B",
    "c.txt": "content C",
  };

  for (const [filename, content] of Object.entries(files)) {
    downloadFile(filename, content);
  }
}

const comments = `
姓名
年龄
邮箱
`;

function mergeCommentsAboveFields(commentsText, fieldsText) {
  const comments = commentsText
    .split('\n')
    .map(line => line.replace(/^\/\/\s*/, '').trim())
    .filter(Boolean);

  const fields = fieldsText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const merged = comments.map((comment, i) => {
    const field = fields[i] || '';
    return `// ${comment}\n${field}`;
  });

  return merged.join('\n\n');
}
console.log( mergeCommentsAboveFields(comments, fields));

const fields = `
name: string
age: number
email: string
`;
</script>

<template>
  <button @click="exportAll">导出所有文件</button>
</template>
