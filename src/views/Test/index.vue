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
</script>

<template>
  <button @click="exportAll">导出所有文件</button>
</template>
