<template>
    <button
      type="button"
      class="ds-toggle"
      :class="isApi ? 'is-api' : 'is-mock'"
      :title="isApi ? 'Usando API real — clique para usar mock' : 'Usando mock local — clique para usar API real'"
      @click="toggle"
    >
      <span class="dot" />
      {{ label }}
    </button>
  </template>
  
  <script setup lang="ts">
  import { useDataSource } from '~/composables/useDataSource'
  const { isApi, label, toggle } = useDataSource()
  </script>
  
  <style scoped>
  .ds-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 20px;
    border: 0.5px solid;
    cursor: pointer;
    font-family: inherit;
    transition: all .15s;
    background: none;
  }
  
  .ds-toggle.is-api {
    color: #3b6d11;
    border-color: #97c459;
    background: #eaf3de;
  }
  .ds-toggle.is-mock {
    color: #854f0b;
    border-color: #ef9f27;
    background: #faeeda;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .is-api  .dot { background: #3b6d11; }
  .is-mock .dot { background: #854f0b; }
  
  .ds-toggle:hover { opacity: .8; }
  </style>