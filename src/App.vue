<script setup>
import { ref, onMounted, reactive } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import Loading from "./components/Loading.vue";
import ace from "ace-builds";

ace.config.set("basePath", "../node_modules/ace-builds/src-noconflict");

const editorInit = () => {};

const show = ref();
const editor = reactive({ code: "", result: "", show: "", isLoding: false });

const runPy = async (code) => {
  editor.isLoding = true;
  editor.show = "";
  editor.result = "";
  const pyodide = await loadPyodide({
    stdout: (result) => {
      editor.show += result + "<br />";
      editor.result += result + "\n";
    },
  });
  // pyodide.setStdout({
  //   batched: (result) => {
  //     editor.show += result + "<br />";
  //     editor.result += result + "\n";
  //   },
  // });

  let system = await pyodide.runPython(code);
  editor.isLoding = false;
  return system;
};

const showResult = async () => {
  const result = await runPy(editor.code);
  // show.value.value = result;
  console.log("done");
};

onMounted(async () => {});
</script>

<template>
  <div class="mx-auto w-full space-y-8 p-5 md:w-3/5">
    <VAceEditor
      v-model:value="editor.code"
      @init="editorInit"
      lang="python"
      theme="chrome"
      class="h-80 w-full border-2 border-black"
    ></VAceEditor>
    <div class="flex justify-center md:justify-end">
      <input
        type="submit"
        class="block w-full cursor-pointer rounded-lg border-2 border-black py-2 px-4 md:w-fit"
        @click="showResult"
        value="執行"
      />
    </div>
    <div class="relative p-3">
      <Loading class="absolute inset-0" v-if="editor.isLoding" />
      <p class="">結果：</p>
      <div
        class="max-h-80 min-h-[5rem] w-full overflow-y-auto border-2 border-black"
        v-html="editor.show"
      ></div>
      <!-- <input
        type="text"
        class="w-full border-2 border-black"
        ref="show"
        disabled
      /> -->
    </div>
  </div>
</template>

<style></style>
