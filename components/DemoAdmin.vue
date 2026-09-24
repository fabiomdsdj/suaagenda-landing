<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden font-sans select-none">

    <!-- ── Overlay mobile ─────────────────────────────────────────────── -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- ── Sidebar ─────────────────────────────────────────────────────── -->
    <aside
      class="w-full md:w-64 bg-white border-r border-gray-200 fixed md:relative h-full z-20 flex flex-col transform transition-transform duration-300 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        <span class="text-xl font-bold text-gray-800">✂️ Studio Demo</span>
        <button
          @click="sidebarOpen = false"
          class="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">

        <!-- Estabelecimento (nome do negócio) -->
        <div class="px-3 py-3 text-sm font-bold text-gray-800">Studio Demo</div>

        <!-- Itens principais -->
        <button
          v-for="item in mainNavItems"
          :key="item.id"
          @click="navigate(item.id)"
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left"
          :class="currentPage === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :class="currentPage === item.id ? 'text-emerald-600' : 'text-gray-500'" />
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold"
          >{{ item.badge }}</span>
        </button>

        <!-- ── Gestão (submenu) ──────────────────────────────────────── -->
        <div class="border-t border-gray-200 mt-2 pt-2">
          <button
            @click="gestaoOpen = !gestaoOpen"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IconPresentationChart class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Gestão</span>
            <span
              class="ml-auto text-gray-400 transition-transform duration-200 text-xs"
              :class="gestaoOpen ? 'rotate-180' : ''"
            >▾</span>
          </button>
          <div v-if="gestaoOpen" class="ml-8 mt-1 space-y-0.5">
            <button
              @click="navigate('relatorios')"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
              :class="currentPage === 'relatorios' ? 'text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'"
            >
              <IconChartBar class="w-4 h-4 text-gray-400" />
              Relatórios
            </button>
            <button
              @click="navigate('metas')"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
              :class="currentPage === 'metas' ? 'text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'"
            >
              <IconTrophy class="w-4 h-4 text-gray-400" />
              Metas
            </button>
          </div>
        </div>

        <!-- ── Marketing (submenu) ──────────────────────────────────── -->
        <div class="border-t border-gray-200 mt-2 pt-2">
          <button
            @click="marketingOpen = !marketingOpen"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IconRocket class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Marketing</span>
            <span
              class="ml-auto text-gray-400 transition-transform duration-200 text-xs"
              :class="marketingOpen ? 'rotate-180' : ''"
            >▾</span>
          </button>
          <div v-if="marketingOpen" class="ml-8 mt-1 space-y-0.5">
            <button
              @click="navigate('fidelidade')"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
              :class="currentPage === 'fidelidade' ? 'text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'"
            >
              <IconStar class="w-4 h-4 text-gray-400" />
              Fidelidade
            </button>
          </div>
        </div>

        <!-- ── Configurações (submenu) ──────────────────────────────── -->
        <div class="border-t border-gray-200 mt-2 pt-2">
          <button
            @click="settingsOpen = !settingsOpen"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IconCog class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Configurações</span>
            <span
              class="ml-auto text-gray-400 transition-transform duration-200 text-xs"
              :class="settingsOpen ? 'rotate-180' : ''"
            >▾</span>
          </button>
          <div v-if="settingsOpen" class="ml-8 mt-1 space-y-0.5">
            <button class="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              Perfil
            </button>
            <button class="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              Usuários
            </button>
            <button
              @click="navigate('planos')"
              class="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors"
              :class="currentPage === 'planos' ? 'text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'"
            >
              Meu plano
            </button>
            <button class="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              Importar CSV
            </button>
          </div>
        </div>

        <!-- ── Integrações (submenu) ────────────────────────────────── -->
        <div class="border-t border-gray-200 mt-2 pt-2">
          <button
            @click="integracoesOpen = !integracoesOpen"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IconArrows class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Integrações</span>
            <span
              class="ml-auto text-gray-400 transition-transform duration-200 text-xs"
              :class="integracoesOpen ? 'rotate-180' : ''"
            >▾</span>
          </button>
          <div v-if="integracoesOpen" class="ml-8 mt-1 space-y-0.5">
            <button class="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              Meu site
            </button>
            <button class="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              WhatsApp
            </button>
          </div>
        </div>

        <!-- ── Compartilhar ─────────────────────────────────────────── -->
        <div class="border-t border-gray-200 mt-2 pt-2">
          <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <IconShare class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Compartilhar</span>
          </button>
        </div>

        <!-- ── Indique e ganhe ───────────────────────────────────────── -->
        <div class="mt-1">
          <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <IconCurrencyDollar class="w-5 h-5 flex-shrink-0 text-gray-500" />
            <span>Indique e ganhe</span>
          </button>
        </div>

      </nav>

      <!-- Plan badge -->
      <div class="p-4 border-t border-gray-200 flex-shrink-0">
        <div class="flex items-center gap-2 px-3 py-2 text-xs">
          <IconShield class="w-4 h-4 text-emerald-500" />
          <span class="font-semibold text-gray-700">Plano Pro</span>
          <button
            @click="navigate('planos')"
            class="ml-auto text-white text-xs rounded-full px-2 py-0.5 font-semibold"
            style="background:#10b981"
          >Upgrade</button>
        </div>
      </div>
    </aside>

    <!-- ── Main ───────────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">

      <!-- Header -->
      <header class="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-10 flex-shrink-0">
        <button
          @click="sidebarOpen = true"
          class="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Breadcrumb desktop -->
        <div class="hidden md:flex flex-1 items-center gap-1 text-sm text-gray-500">
          <span>Admin</span>
          <span class="text-gray-300">›</span>
          <span class="text-gray-800 font-medium">{{ currentPageLabel }}</span>
        </div>

        <!-- Título mobile -->
        <div class="md:hidden flex-1 text-sm font-semibold text-gray-800">{{ currentPageLabel }}</div>

        <button class="relative p-2 text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div class="flex items-center gap-2 cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">A</div>
          <span class="hidden sm:block text-sm text-gray-700">Admin</span>
          <svg class="w-4 h-4 text-gray-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="max-w-7xl mx-auto">

          <!-- ── DASHBOARD ──────────────────────────────────────────── -->
          <div v-if="currentPage === 'dashboard'" class="p-3 md:p-6 space-y-4 md:space-y-6">
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Visão geral</h1>
              <p class="text-sm text-gray-500 mt-0.5">{{ todayLabel }}</p>
            </div>

            <div class="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              <div
                v-for="card in dashCards"
                :key="card.label"
                class="rounded-2xl overflow-hidden shadow-sm border"
                :class="card.bg"
              >
                <div class="h-1" :class="card.bar" />
                <div class="p-3 md:p-4">
                  <div class="flex items-center gap-2 mb-2 md:mb-3">
                    <div class="p-1 md:p-1.5 rounded-lg" :class="card.iconBg">
                      <span class="text-xs md:text-sm">{{ card.icon }}</span>
                    </div>
                    <p class="text-xs font-semibold leading-tight" :class="card.labelColor">{{ card.label }}</p>
                  </div>
                  <p class="text-xl md:text-2xl font-black tabular-nums" :class="card.valueColor">{{ card.value }}</p>
                  <p class="text-xs mt-1" :class="card.periodColor">{{ card.period }}</p>
                </div>
              </div>
            </div>

            <!-- Próximos agendamentos -->
            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div class="h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
              <div class="p-4 md:p-5">
                <h3 class="text-sm font-bold text-gray-800 mb-3 md:mb-4">📅 Próximos agendamentos de hoje</h3>
                <div class="space-y-2">
                  <div
                    v-for="appt in todayAppointments"
                    :key="appt.id"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div
                      class="w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-xs md:text-sm text-white"
                      :style="{ background: appt.color }"
                    >{{ appt.initials }}</div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ appt.client }}</p>
                      <p class="text-xs text-gray-400 truncate">{{ appt.service }} · {{ appt.professional }}</p>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <p class="text-sm font-bold text-gray-800">{{ appt.time }}</p>
                      <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" :class="appt.statusClass">{{ appt.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top serviços + profissionais -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="bg-white border border-amber-200 rounded-2xl overflow-hidden">
                <div class="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                <div class="p-4 md:p-5">
                  <h3 class="text-sm font-bold text-gray-800 mb-3 md:mb-4">🏆 Top Serviços</h3>
                  <div class="space-y-2">
                    <div
                      v-for="(s, i) in topServices"
                      :key="s.name"
                      class="flex items-center justify-between px-3 py-2 rounded-xl border"
                      :class="i === 0 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'"
                    >
                      <div class="flex items-center gap-2 min-w-0">
                        <span class="text-sm w-5 text-center flex-shrink-0">{{ i === 0 ? '🥇' : i + 1 }}</span>
                        <div class="min-w-0">
                          <p class="text-sm font-bold text-gray-800 truncate">{{ s.name }}</p>
                          <p class="text-xs text-gray-400">{{ s.count }} agend.</p>
                        </div>
                      </div>
                      <p class="text-sm font-black text-emerald-600 flex-shrink-0 ml-2">{{ s.revenue }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white border border-violet-200 rounded-2xl overflow-hidden">
                <div class="h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                <div class="p-4 md:p-5">
                  <h3 class="text-sm font-bold text-gray-800 mb-3 md:mb-4">👩‍💼 Top Profissionais</h3>
                  <div class="space-y-2">
                    <div
                      v-for="(p, i) in topProfissionais"
                      :key="p.name"
                      class="flex items-center justify-between px-3 py-2 rounded-xl border"
                      :class="i === 0 ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-gray-100'"
                    >
                      <div class="flex items-center gap-2 min-w-0">
                        <span class="text-sm w-5 text-center flex-shrink-0">{{ i === 0 ? '🥇' : i + 1 }}</span>
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          :style="{ background: p.color }"
                        >{{ p.initials }}</div>
                        <div class="min-w-0">
                          <p class="text-sm font-bold text-gray-800 truncate">{{ p.name }}</p>
                          <p class="text-xs text-gray-400">{{ p.count }} atend.</p>
                        </div>
                      </div>
                      <p class="text-sm font-black text-emerald-600 flex-shrink-0 ml-2">{{ p.revenue }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── AGENDA ─────────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'agenda'" class="p-3 md:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">Agenda</h1>
                <p class="text-sm text-gray-500 mt-0.5">Gerencie os agendamentos</p>
              </div>
              <div class="flex items-center gap-2 self-start sm:self-auto">
                <button class="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  🔒 Bloquear
                </button>
                <button
                  @click="showNewApptModal = true"
                  class="px-4 py-2 text-white rounded-lg text-sm font-semibold"
                  style="background:#10b981"
                >+ Novo agendamento</button>
              </div>
            </div>

            <!-- Filtros profissional/unidade -->
            <div class="flex flex-wrap gap-2">
              <select class="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option>Todas as unidades</option>
                <option>Unidade Centro</option>
              </select>
              <select class="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option>Todos os profissionais</option>
                <option v-for="emp in demoEmployees" :key="emp.id">{{ emp.name }}</option>
              </select>
              <div class="flex items-center bg-gray-100 p-0.5 rounded-lg ml-auto">
                <button
                  class="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  :class="agendaView === 'individual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                  @click="agendaView = 'individual'"
                >Individual</button>
                <button
                  class="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  :class="agendaView === 'team' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                  @click="agendaView = 'team'"
                >Equipe</button>
              </div>
            </div>

            <!-- Week calendar -->
            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <div class="grid border-b border-gray-100" style="grid-template-columns: 52px repeat(7, minmax(80px, 1fr)); min-width: 620px;">
                  <div class="py-3 border-r border-gray-100" />
                  <div
                    v-for="day in weekDays"
                    :key="day.label"
                    class="py-3 text-center text-xs font-semibold uppercase tracking-wider border-r border-gray-100 last:border-0"
                    :class="day.today ? 'text-emerald-600' : 'text-gray-400'"
                  >
                    <div>{{ day.label }}</div>
                    <div class="text-base font-black mt-0.5" :class="day.today ? 'text-emerald-600' : 'text-gray-700'">{{ day.date }}</div>
                  </div>
                </div>
                <div class="overflow-y-auto" style="max-height: 400px; min-width: 620px;">
                  <div
                    v-for="hour in calendarHours"
                    :key="hour"
                    class="grid border-b border-gray-50"
                    style="grid-template-columns: 52px repeat(7, minmax(80px, 1fr)); min-height: 52px;"
                  >
                    <div class="px-2 py-1 text-xs text-gray-400 border-r border-gray-100 flex items-start pt-2 flex-shrink-0">{{ hour }}</div>
                    <div
                      v-for="(day, di) in weekDays"
                      :key="day.label"
                      class="border-r border-gray-50 last:border-0 relative px-0.5 py-0.5"
                    >
                      <div
                        v-for="ev in getCalendarEvents(hour, di)"
                        :key="ev.id"
                        class="rounded-md text-xs px-1.5 py-1 leading-tight cursor-pointer hover:opacity-90 transition-opacity"
                        :style="{ background: ev.color + '22', borderLeft: '3px solid ' + ev.color, color: ev.color }"
                      >
                        <div class="font-semibold truncate">{{ ev.client }}</div>
                        <div class="opacity-80 truncate">{{ ev.service }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── CLIENTES ────────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'clientes'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">Clientes</h1>
                <p class="text-sm text-gray-500 mt-1">{{ demoClients.length }} clientes cadastrados</p>
              </div>
              <button
                @click="showNewClientModal = true"
                class="px-4 py-2 text-white rounded-lg text-sm font-semibold self-start sm:self-auto"
                style="background:#10b981"
              >+ Novo Cliente</button>
            </div>

            <!-- Usage bar mock -->
            <div class="bg-white border border-gray-200 rounded-xl p-3">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-gray-600">Clientes cadastrados</span>
                <span class="font-medium text-gray-900">{{ demoClients.length }} / 50</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-1.5 rounded-full bg-emerald-500" :style="{ width: (demoClients.length / 50 * 100) + '%' }" />
              </div>
            </div>

            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
              </svg>
              <input
                v-model="clientSearch"
                type="text"
                placeholder="Buscar por nome, email ou telefone..."
                class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table class="hidden sm:table w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th class="px-4 py-3 font-medium">Cliente</th>
                    <th class="px-4 py-3 font-medium">Contato</th>
                    <th class="px-4 py-3 font-medium">Celular</th>
                    <th class="px-4 py-3 font-medium">Status</th>
                    <th class="px-4 py-3 font-medium">Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="client in filteredClients"
                    :key="client.id"
                    class="border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                    @click="selectedClient = client; currentPage = 'cliente-detalhe'"
                  >
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-sm text-white"
                          :style="{ background: client.color }"
                        >{{ client.initials }}</div>
                        <div>
                          <p class="font-medium text-gray-900">{{ client.name }}</p>
                          <p class="text-xs text-gray-400">{{ client.cpf }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-gray-600">{{ client.email }}</td>
                    <td class="px-4 py-3 text-gray-600">{{ client.phone }}</td>
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="client.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                      >
                        <span class="w-1.5 h-1.5 rounded-full" :class="client.status === 'ativo' ? 'bg-green-500' : 'bg-gray-400'" />
                        {{ client.status === 'ativo' ? 'Ativo' : 'Inativo' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-400 text-xs">{{ client.date }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="sm:hidden divide-y divide-gray-100">
                <div
                  v-for="client in filteredClients"
                  :key="client.id"
                  class="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="selectedClient = client; currentPage = 'cliente-detalhe'; sidebarOpen = false"
                >
                  <div
                    class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-sm text-white"
                    :style="{ background: client.color }"
                  >{{ client.initials }}</div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 truncate">{{ client.name }}</p>
                    <p class="text-xs text-gray-400 truncate">{{ client.email || client.phone }}</p>
                  </div>
                  <span
                    class="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    :class="client.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                  >{{ client.status === 'ativo' ? 'Ativo' : 'Inativo' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── CLIENTE DETALHE ─────────────────────────────────────── -->
          <div v-else-if="currentPage === 'cliente-detalhe' && selectedClient" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex items-center gap-2">
              <button @click="currentPage = 'clientes'" class="text-sm text-emerald-600 hover:underline">← Clientes</button>
              <span class="text-gray-300">/</span>
              <span class="text-sm text-gray-700 font-medium truncate">{{ selectedClient.name }}</span>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div class="flex items-center gap-4 mb-4 md:mb-6">
                <div
                  class="w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 flex items-center justify-center text-white text-lg md:text-xl font-bold"
                  :style="{ background: selectedClient.color }"
                >{{ selectedClient.initials }}</div>
                <div class="flex-1 min-w-0">
                  <h2 class="text-lg md:text-xl font-bold text-gray-900 truncate">{{ selectedClient.name }}</h2>
                  <p class="text-sm text-gray-500 truncate">{{ selectedClient.email }}</p>
                </div>
                <span class="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-700 flex-shrink-0">Ativo</span>
              </div>
              <div class="grid grid-cols-2 gap-3 md:gap-4">
                <div class="bg-gray-50 rounded-xl p-3 md:p-4">
                  <p class="text-xs text-gray-400 mb-1">Telefone</p>
                  <p class="font-medium text-gray-800 text-sm">{{ selectedClient.phone }}</p>
                </div>
                <div class="bg-gray-50 rounded-xl p-3 md:p-4">
                  <p class="text-xs text-gray-400 mb-1">CPF</p>
                  <p class="font-medium text-gray-800 text-sm">{{ selectedClient.cpf }}</p>
                </div>
                <div class="bg-gray-50 rounded-xl p-3 md:p-4">
                  <p class="text-xs text-gray-400 mb-1">Total gasto</p>
                  <p class="font-bold text-emerald-600 text-base md:text-lg">{{ selectedClient.totalSpent }}</p>
                </div>
                <div class="bg-gray-50 rounded-xl p-3 md:p-4">
                  <p class="text-xs text-gray-400 mb-1">Agendamentos</p>
                  <p class="font-bold text-blue-600 text-base md:text-lg">{{ selectedClient.totalAppts }}</p>
                </div>
              </div>
            </div>

            <!-- Loyalty card -->
            <div class="rounded-2xl p-4 md:p-5 text-white relative overflow-hidden" style="background: linear-gradient(135deg, #059669, #0d9488)">
              <div class="absolute right-0 top-0 opacity-10 text-8xl md:text-9xl leading-none">⭐</div>
              <p class="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Cartão Fidelidade</p>
              <p class="text-base md:text-lg font-bold">{{ selectedClient.name }}</p>
              <div class="mt-3 md:mt-4">
                <p class="text-xs opacity-75">Saldo atual</p>
                <p class="text-3xl md:text-4xl font-black">{{ selectedClient.points }} <span class="text-base md:text-lg font-normal opacity-80">pts</span></p>
              </div>
              <div class="mt-3 flex items-center justify-between text-xs opacity-75">
                <span>🥇 Gold</span>
                <span>Total: {{ selectedClient.lifetimePoints }} pts</span>
              </div>
            </div>
          </div>

          <!-- ── ESTABELECIMENTO (Unidades) ──────────────────────────── -->
          <div v-else-if="currentPage === 'estabelecimento'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">1 unidade</h1>
                <p class="text-sm text-gray-500 mt-1">Gerencie as unidades do seu estabelecimento</p>
              </div>
              <button class="px-4 py-2 text-white rounded-lg text-sm font-semibold self-start sm:self-auto" style="background:#10b981">+ Nova Unidade</button>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all">
              <div class="flex items-start justify-between mb-3">
                <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Ativa</span>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Studio Demo Centro</h3>
              <div class="space-y-1 text-sm text-gray-500">
                <p>(11) 3333-4444</p>
                <p>studio@email.com</p>
                <p>São Paulo, SP</p>
              </div>
            </div>
          </div>

          <!-- ── PROFISSIONAIS ───────────────────────────────────────── -->
          <div v-else-if="currentPage === 'profissionais'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">Você tem {{ demoEmployees.length }} profissionais ativos</h1>
                <p class="text-sm text-gray-500 mt-1">Gerencie sua equipe</p>
              </div>
              <button class="px-4 py-2 text-white rounded-lg text-sm font-semibold self-start sm:self-auto" style="background:#10b981">Criar Profissional</button>
            </div>

            <!-- Usage bar mock -->
            <div class="bg-white border border-gray-200 rounded-xl p-3">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-gray-600">Profissionais cadastrados</span>
                <span class="font-medium text-gray-900">{{ demoEmployees.length }} / 5</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-1.5 rounded-full bg-emerald-500" :style="{ width: (demoEmployees.length / 5 * 100) + '%' }" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div
                v-for="emp in demoEmployees"
                :key="emp.id"
                class="bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
              >
                <div class="flex items-center gap-3 md:gap-4">
                  <div
                    class="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0"
                    :style="{ background: emp.color }"
                  >{{ emp.initials }}</div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 truncate">{{ emp.name }}</p>
                    <p class="text-sm text-gray-400">{{ emp.role }}</p>
                    <p class="text-xs text-gray-400 mt-0.5 truncate">{{ emp.email }}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="text-xs text-gray-400">Este mês</p>
                    <p class="font-bold text-emerald-600 text-sm md:text-base">{{ emp.revenue }}</p>
                    <p class="text-xs text-gray-400">{{ emp.appts }} atend.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── SERVIÇOS ────────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'servicos'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">{{ demoServices.length }} serviços cadastrados</h1>
                <p class="text-sm text-gray-500 mt-1">Gerencie os serviços do seu estabelecimento</p>
              </div>
              <button class="px-4 py-2 text-white rounded-lg text-sm font-semibold self-start sm:self-auto" style="background:#10b981">+ Criar Serviço</button>
            </div>

            <!-- Usage bar mock -->
            <div class="bg-white border border-gray-200 rounded-xl p-3">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-gray-600">Serviços cadastrados</span>
                <span class="font-medium text-gray-900">{{ demoServices.length }} / ilimitado</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-1.5 rounded-full bg-emerald-500" style="width: 40%" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div
                v-for="svc in demoServices"
                :key="svc.id"
                class="bg-white border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    :style="{ background: svc.color + '22' }"
                  >{{ svc.emoji }}</div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 truncate">{{ svc.name }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ svc.category }} · {{ svc.duration }}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="font-bold text-gray-800">{{ svc.price }}</p>
                    <span class="text-xs text-gray-400">{{ svc.count }}x/mês</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── RELATÓRIOS ──────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'relatorios'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 class="text-xl md:text-2xl font-bold text-gray-900">Relatórios</h1>
                <p class="text-sm text-gray-400 mt-0.5">Análise detalhada do seu negócio</p>
              </div>
              <select class="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium bg-white text-gray-700 self-start sm:self-auto">
                <option>Últimos 30 dias</option>
                <option>Últimos 7 dias</option>
                <option>Últimos 90 dias</option>
              </select>
            </div>

            <div class="grid grid-cols-2 xl:grid-cols-4 gap-3">
              <div v-for="m in reportMetrics" :key="m.label" class="rounded-2xl overflow-hidden shadow-sm border" :class="m.bg">
                <div class="h-1" :class="m.bar" />
                <div class="p-3 md:p-4">
                  <p class="text-xs font-semibold mb-1 md:mb-2" :class="m.labelColor">{{ m.label }}</p>
                  <p class="text-lg md:text-xl font-black tabular-nums" :class="m.valueColor">{{ m.value }}</p>
                  <p class="text-xs mt-1" :class="m.periodColor">{{ m.sub }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div class="h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
              <div class="p-4 md:p-5">
                <h3 class="text-sm font-bold text-gray-800 mb-4">💰 Receita Diária</h3>
                <div class="flex items-end gap-0.5 md:gap-1 h-32 md:h-40">
                  <div
                    v-for="(bar, i) in revenueBars"
                    :key="i"
                    class="flex-1 rounded-t-sm transition-all hover:opacity-80 cursor-pointer"
                    :style="{ height: bar.pct + '%', background: '#10b981' + (i % 2 === 0 ? 'cc' : '99') }"
                    :title="bar.label + ': ' + bar.value"
                  />
                </div>
                <div class="flex gap-0.5 md:gap-1 mt-2">
                  <div v-for="(bar, i) in revenueBars" :key="i" class="flex-1 text-center text-xs text-gray-400 truncate">{{ bar.label }}</div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="bg-white border border-amber-200 rounded-2xl overflow-hidden">
                <div class="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                <div class="p-4 md:p-5">
                  <h3 class="text-sm font-bold text-gray-800 mb-3 md:mb-4">🏆 Top Serviços</h3>
                  <div class="space-y-2">
                    <div v-for="(s, i) in topServices" :key="s.name" class="flex items-center justify-between px-3 py-2 rounded-xl" :class="i === 0 ? 'bg-amber-50' : 'bg-gray-50'">
                      <span class="text-sm flex-shrink-0">{{ i === 0 ? '🥇' : i + 1 }}</span>
                      <span class="flex-1 text-sm font-medium text-gray-800 mx-2 truncate">{{ s.name }}</span>
                      <span class="text-xs text-gray-400 mr-2 flex-shrink-0">{{ s.count }}x</span>
                      <span class="text-sm font-bold text-emerald-600 flex-shrink-0">{{ s.revenue }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white border border-violet-200 rounded-2xl overflow-hidden">
                <div class="h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                <div class="p-4 md:p-5">
                  <h3 class="text-sm font-bold text-gray-800 mb-3 md:mb-4">👩‍💼 Top Profissionais</h3>
                  <div class="space-y-2">
                    <div v-for="(p, i) in topProfissionais" :key="p.name" class="flex items-center gap-2 px-3 py-2 rounded-xl" :class="i === 0 ? 'bg-violet-50' : 'bg-gray-50'">
                      <span class="text-sm flex-shrink-0">{{ i === 0 ? '🥇' : i + 1 }}</span>
                      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" :style="{ background: p.color }">{{ p.initials }}</div>
                      <span class="flex-1 text-sm font-medium text-gray-800 truncate">{{ p.name }}</span>
                      <span class="text-xs text-gray-400 mr-2 flex-shrink-0">{{ p.count }}x</span>
                      <span class="text-sm font-bold text-emerald-600 flex-shrink-0">{{ p.revenue }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── METAS ───────────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'metas'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">🎯 Plano de Metas</h1>
              <p class="text-sm text-gray-500 mt-0.5">Acompanhe o progresso dos seus objetivos</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
              <div
                v-for="goal in demoGoals"
                :key="goal.id"
                class="rounded-2xl overflow-hidden shadow-sm border"
                :class="goal.type === 'revenue' ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border-blue-200'"
              >
                <div class="h-1.5" :class="goal.type === 'revenue' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-blue-400 to-indigo-500'" />
                <div class="p-4">
                  <div class="flex items-center gap-3 mb-3">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                      :style="{ background: goal.employeeColor || '#6b7280' }"
                    >{{ goal.employeeInitials || '🏢' }}</div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-bold truncate" :class="goal.type === 'revenue' ? 'text-emerald-900' : 'text-blue-900'">{{ goal.name }}</p>
                      <span class="text-xs px-2 py-0.5 rounded-full font-semibold text-white" :style="{ background: goal.type === 'revenue' ? '#10b981' : '#6366f1' }">{{ goal.type === 'revenue' ? '💰 Receita' : '📅 Agendamentos' }}</span>
                    </div>
                    <p class="text-2xl md:text-3xl font-black flex-shrink-0" :class="goal.type === 'revenue' ? 'text-emerald-600' : 'text-indigo-600'">{{ goal.pct }}%</p>
                  </div>
                  <div class="mb-3">
                    <p class="text-xl md:text-2xl font-black tabular-nums" :class="goal.type === 'revenue' ? 'text-emerald-700' : 'text-indigo-700'">{{ goal.current }}</p>
                    <p class="text-xs mt-0.5" :class="goal.type === 'revenue' ? 'text-teal-600' : 'text-indigo-500'">meta: <span class="font-semibold">{{ goal.target }}</span></p>
                  </div>
                  <div class="w-full rounded-full h-2.5 overflow-hidden mb-2" :class="goal.type === 'revenue' ? 'bg-emerald-200' : 'bg-blue-200'">
                    <div
                      class="h-2.5 rounded-full"
                      :class="goal.type === 'revenue' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500'"
                      :style="{ width: goal.pct + '%' }"
                    />
                  </div>
                  <p class="text-xs font-bold" :class="goal.pct >= 100 ? 'text-emerald-600' : goal.pct >= 75 ? 'text-orange-500' : 'text-gray-400'">
                    {{ goal.pct >= 100 ? '🎉 Meta atingida!' : goal.pct >= 75 ? '🔥 Quase lá!' : '💪 Continue assim' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── FIDELIDADE ──────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'fidelidade'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Programa de Fidelidade</h1>
              <p class="text-sm text-gray-500 mt-1">Faça seus clientes acumularem pontos e trocarem por descontos</p>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 flex items-start sm:items-center justify-between gap-4">
              <div class="flex-1">
                <p class="font-semibold text-gray-900">Programa ativo</p>
                <p class="text-sm text-gray-400 mt-0.5">Clientes acumulam pontos automaticamente ao concluir serviços</p>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0">
                <span class="text-sm font-medium text-green-600">Ativo</span>
                <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors flex-shrink-0">
                  <span class="inline-block h-4 w-4 rounded-full bg-white shadow-md transform translate-x-6 transition-transform" />
                </button>
              </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 space-y-4 md:space-y-5">
              <h2 class="text-base font-semibold text-gray-900">⭐ Acúmulo de Pontos</h2>
              <div class="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">Pontos por R$1 gasto</label>
                  <div class="flex rounded-lg border border-gray-300 overflow-hidden">
                    <input type="number" value="1" class="flex-1 px-3 py-2 text-sm bg-white outline-none min-w-0" />
                    <span class="flex items-center px-3 bg-gray-50 border-l border-gray-300 text-sm text-gray-500 font-medium whitespace-nowrap">pts / R$</span>
                  </div>
                  <p class="text-xs text-emerald-600 font-medium">Ex: serviço de R$80 → <strong>80 pontos</strong></p>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700">Mínimo para resgatar</label>
                  <div class="flex rounded-lg border border-gray-300 overflow-hidden">
                    <input type="number" value="100" class="flex-1 px-3 py-2 text-sm bg-white outline-none min-w-0" />
                    <span class="flex items-center px-3 bg-gray-50 border-l border-gray-300 text-sm text-gray-500 font-medium whitespace-nowrap">pontos</span>
                  </div>
                  <p class="text-xs text-emerald-600 font-medium">100 pts = <strong>R$1,00</strong> de desconto</p>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 space-y-4">
              <h2 class="text-base font-semibold text-gray-900">🏆 Níveis de clientes</h2>
              <div class="grid sm:grid-cols-2 gap-3">
                <div v-for="tier in loyaltyTiers" :key="tier.key" class="flex items-center gap-3 p-3 border rounded-lg" :class="tier.border">
                  <span class="text-xl md:text-2xl flex-shrink-0">{{ tier.emoji }}</span>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold" :class="tier.text">{{ tier.label }}</p>
                    <p class="text-xs text-gray-400">a partir de {{ tier.threshold }} pts</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-50 to-indigo-50 border border-emerald-200 rounded-2xl p-4 md:p-5 space-y-3">
              <h2 class="text-base font-semibold text-gray-800">📊 Preview da experiência do cliente</h2>
              <div class="grid grid-cols-3 gap-2 md:gap-3 text-center">
                <div class="bg-white rounded-xl p-3 shadow-sm">
                  <p class="text-xs text-gray-400 mb-1">Serviço R$100</p>
                  <p class="text-xl md:text-2xl font-bold text-emerald-600">100</p>
                  <p class="text-xs text-gray-500">pts ganhos</p>
                </div>
                <div class="bg-white rounded-xl p-3 shadow-sm">
                  <p class="text-xs text-gray-400 mb-1">100 pts =</p>
                  <p class="text-xl md:text-2xl font-bold text-green-600">R$1</p>
                  <p class="text-xs text-gray-500">de desconto</p>
                </div>
                <div class="bg-white rounded-xl p-3 shadow-sm">
                  <p class="text-xs text-gray-400 mb-1">Gold</p>
                  <p class="text-xl md:text-2xl font-bold text-yellow-500">2.000</p>
                  <p class="text-xs text-gray-500">pts lifetime</p>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button class="px-6 py-2 text-white rounded-lg text-sm font-semibold" style="background:#10b981">Salvar configurações</button>
            </div>
          </div>

          <!-- ── PLANOS ──────────────────────────────────────────────── -->
          <div v-else-if="currentPage === 'planos'" class="p-3 md:p-6 space-y-4 md:space-y-5">
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Meu plano</h1>
              <p class="text-sm text-gray-500 mt-0.5">Você está no plano <strong>Pro</strong></p>
            </div>

            <div class="grid sm:grid-cols-3 gap-4">
              <div
                v-for="plan in demoPlans"
                :key="plan.name"
                class="rounded-2xl overflow-hidden border p-5 flex flex-col relative bg-white"
                :class="plan.current ? 'border-emerald-400 ring-2 ring-emerald-300' : 'border-gray-200'"
              >
                <div
                  v-if="plan.popular"
                  class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style="background:#10b981"
                >Mais popular</div>
                <div class="mb-4">
                  <p class="font-bold text-gray-900 text-lg">{{ plan.name }}</p>
                  <p class="text-2xl md:text-3xl font-black mt-2">{{ plan.price }}<span class="text-sm font-normal text-gray-400">/mês</span></p>
                </div>
                <ul class="space-y-2 flex-1 mb-5">
                  <li v-for="f in plan.features" :key="f" class="flex items-center gap-2 text-sm text-gray-700">
                    <span class="text-emerald-500 flex-shrink-0">✓</span>
                    <span>{{ f }}</span>
                  </li>
                </ul>
                <button
                  class="w-full py-2.5 rounded-xl text-sm font-bold transition-colors"
                  :class="plan.current ? 'bg-gray-100 text-gray-500 cursor-default' : 'text-white'"
                  :style="plan.current ? '' : 'background:#10b981'"
                >{{ plan.current ? 'Plano atual' : 'Assinar' }}</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- ── Modal: Novo agendamento ─────────────────────────────────────── -->
    <Transition name="fade">
      <div
        v-if="showNewApptModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
        @click.self="showNewApptModal = false"
      >
        <div class="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Novo Agendamento</h2>
            <button @click="showNewApptModal = false" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-5 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Profissional*</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option v-for="emp in demoEmployees" :key="emp.id">{{ emp.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Cliente*</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option v-for="c in demoClients" :key="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Serviço*</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option v-for="s in demoServices" :key="s.id">{{ s.name }} — {{ s.price }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Horário de Início*</label>
              <input type="time" value="09:00" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <div class="flex gap-2 px-5 py-4 border-t border-gray-100">
            <button @click="showNewApptModal = false" class="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Cancelar</button>
            <button @click="showNewApptModal = false" class="flex-1 py-2 text-white rounded-lg text-sm font-semibold" style="background:#10b981">Salvar</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Modal: Novo cliente ─────────────────────────────────────────── -->
    <Transition name="fade">
      <div
        v-if="showNewClientModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
        @click.self="showNewClientModal = false"
      >
        <div class="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Novo Cliente</h2>
            <button @click="showNewClientModal = false" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-5 py-4 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium mb-1">Nome*</label>
                <input type="text" placeholder="Ex: Maria" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Sobrenome</label>
                <input type="text" placeholder="Ex: Silva" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">E-mail</label>
              <input type="email" placeholder="cliente@email.com" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Celular</label>
              <input type="tel" placeholder="(11) 99999-9999" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <div class="flex gap-2 px-5 py-4 border-t border-gray-100">
            <button @click="showNewClientModal = false" class="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Cancelar</button>
            <button @click="showNewClientModal = false" class="flex-1 py-2 text-white rounded-lg text-sm font-semibold" style="background:#10b981">Salvar</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'

// ─── Inline SVG icon components (sem dependência de heroicons) ────────────────
const IconPresentationChart = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })]) })
const IconChartBar          = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })]) })
const IconTrophy            = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })]) })
const IconRocket            = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })]) })
const IconStar              = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' })]) })
const IconCog               = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })]) })
const IconArrows            = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' })]) })
const IconShare             = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' })]) })
const IconCurrencyDollar    = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconShield            = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })]) })

// ─── Nav icons para itens principais ──────────────────────────────────────────
const IconDashboard  = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })]) })
const IconBuilding   = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })]) })
const IconUsers      = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' })]) })
const IconScissors   = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('circle', { cx: '6', cy: '6', r: '3', 'stroke-width': '2' }), h('circle', { cx: '6', cy: '18', r: '3', 'stroke-width': '2' }), h('line', { x1: '20', y1: '4', x2: '8.12', y2: '15.88', 'stroke-width': '2', 'stroke-linecap': 'round' }), h('line', { x1: '14.47', y1: '14.48', x2: '20', y2: '20', 'stroke-width': '2', 'stroke-linecap': 'round' }), h('line', { x1: '8.12', y1: '8.12', x2: '12', y2: '12', 'stroke-width': '2', 'stroke-linecap': 'round' })]) })
const IconCalendar   = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })]) })
const IconUser       = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })]) })

// ─── UI State ─────────────────────────────────────────────────────────────────
const currentPage        = ref('dashboard')
const sidebarOpen        = ref(false)
const gestaoOpen         = ref(true)
const marketingOpen      = ref(true)
const settingsOpen       = ref(true)
const integracoesOpen    = ref(true)
const showNewApptModal   = ref(false)
const showNewClientModal = ref(false)
const clientSearch       = ref('')
const selectedClient     = ref<any>(null)
const agendaView         = ref<'individual' | 'team'>('team')

// ─── Helpers ──────────────────────────────────────────────────────────────────
function navigate(page: string) {
  currentPage.value = page
  sidebarOpen.value = false
}

// ─── Nav principal (igual ao layout real) ─────────────────────────────────────
const mainNavItems = [
  { id: 'dashboard',      label: 'Visão geral',   icon: IconDashboard },
  { id: 'estabelecimento',label: 'Estabelecimento',icon: IconBuilding  },
  { id: 'profissionais',  label: 'Equipe',          icon: IconUsers     },
  { id: 'servicos',       label: 'Serviços',        icon: IconScissors  },
  { id: 'clientes',       label: 'Clientes',        icon: IconUsers     },
  { id: 'agenda',         label: 'Agenda',          icon: IconCalendar, badge: '8' },
]

const currentPageLabel = computed(() => {
  if (currentPage.value === 'cliente-detalhe' && selectedClient.value) return selectedClient.value.name
  const found = mainNavItems.find(n => n.id === currentPage.value)
  if (found) return found.label
  const subLabels: Record<string, string> = {
    relatorios: 'Relatórios',
    metas: 'Metas',
    fidelidade: 'Fidelidade',
    planos: 'Meu plano',
    estabelecimento: 'Estabelecimento',
  }
  return subLabels[currentPage.value] ?? currentPage.value
})

const todayLabel = computed(() =>
  new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
)

// ─── Dashboard cards ──────────────────────────────────────────────────────────
const dashCards = [
  { label: 'Receita Total',   value: 'R$8.340', period: 'últimos 7 dias', icon: '💰', bg: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200',  bar: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',  iconBg: 'bg-emerald-100', labelColor: 'text-emerald-700', valueColor: 'text-emerald-700', periodColor: 'text-teal-500'  },
  { label: 'Agendamentos',    value: '73',       period: 'últimos 7 dias', icon: '📅', bg: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200',         bar: 'bg-gradient-to-r from-blue-400 to-sky-400',                   iconBg: 'bg-blue-100',    labelColor: 'text-blue-700',    valueColor: 'text-blue-700',    periodColor: 'text-sky-500'   },
  { label: 'Clientes Ativos', value: '41',       period: 'últimos 7 dias', icon: '👥', bg: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 border-violet-200',bar: 'bg-gradient-to-r from-violet-400 to-fuchsia-400',             iconBg: 'bg-violet-100',  labelColor: 'text-violet-700',  valueColor: 'text-violet-700',  periodColor: 'text-purple-500'},
  { label: 'Comparecimento',  value: '94%',      period: 'taxa de presença',icon: '✅', bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-orange-200',  bar: 'bg-gradient-to-r from-orange-400 to-amber-400',               iconBg: 'bg-orange-100',  labelColor: 'text-orange-700',  valueColor: 'text-orange-700',  periodColor: 'text-amber-600' },
]

// ─── Agendamentos de hoje ─────────────────────────────────────────────────────
const todayAppointments = [
  { id: 1, client: 'Marina Costa',    service: 'Coloração',          professional: 'Jéssica',  time: '09:00', status: 'Confirmado', statusClass: 'bg-green-100 text-green-700',  color: '#10b981', initials: 'MC' },
  { id: 2, client: 'Ana Rodrigues',   service: 'Corte + Escova',     professional: 'Camila',   time: '10:30', status: 'Confirmado', statusClass: 'bg-green-100 text-green-700',  color: '#6366f1', initials: 'AR' },
  { id: 3, client: 'Priscila Mendes', service: 'Hidratação',         professional: 'Jéssica',  time: '11:00', status: 'Aguardando', statusClass: 'bg-yellow-100 text-yellow-700', color: '#f59e0b', initials: 'PM' },
  { id: 4, client: 'Beatriz Lima',    service: 'Manicure',           professional: 'Fernanda', time: '14:00', status: 'Confirmado', statusClass: 'bg-green-100 text-green-700',  color: '#ec4899', initials: 'BL' },
  { id: 5, client: 'Carla Souza',     service: 'Escova Progressiva', professional: 'Camila',   time: '15:30', status: 'Confirmado', statusClass: 'bg-green-100 text-green-700',  color: '#8b5cf6', initials: 'CS' },
]

// ─── Top serviços / profissionais ─────────────────────────────────────────────
const topServices = [
  { name: 'Coloração',          count: 24, revenue: 'R$2.880' },
  { name: 'Corte + Escova',     count: 31, revenue: 'R$2.170' },
  { name: 'Escova Progressiva', count: 12, revenue: 'R$1.800' },
  { name: 'Hidratação',         count: 18, revenue: 'R$1.260' },
  { name: 'Manicure',           count: 42, revenue: 'R$1.050' },
]

const topProfissionais = [
  { name: 'Jéssica Alves',   initials: 'JA', count: 38, revenue: 'R$3.420', color: '#10b981' },
  { name: 'Camila Ferreira', initials: 'CF', count: 29, revenue: 'R$2.610', color: '#6366f1' },
  { name: 'Fernanda Nunes',  initials: 'FN', count: 22, revenue: 'R$1.540', color: '#f59e0b' },
]

// ─── Calendário ───────────────────────────────────────────────────────────────
const calendarHours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

const weekDays = computed(() => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1)
  const labels = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']
  return labels.map((label, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return { label, date: d.getDate(), today: d.toDateString() === today.toDateString() }
  })
})

const calendarEventsData = [
  { id: 1, hour: '09:00', day: 0, client: 'Marina C.',   service: 'Coloração',    color: '#10b981' },
  { id: 2, hour: '10:30', day: 0, client: 'Ana R.',       service: 'Corte+Escova', color: '#6366f1' },
  { id: 3, hour: '14:00', day: 0, client: 'Beatriz L.',   service: 'Manicure',     color: '#ec4899' },
  { id: 4, hour: '09:00', day: 1, client: 'Carla S.',     service: 'Progressiva',  color: '#8b5cf6' },
  { id: 5, hour: '11:00', day: 2, client: 'Juliana M.',   service: 'Hidratação',   color: '#f59e0b' },
  { id: 6, hour: '10:30', day: 3, client: 'Renata F.',    service: 'Coloração',    color: '#10b981' },
  { id: 7, hour: '15:30', day: 4, client: 'Patrícia G.', service: 'Corte',        color: '#0ea5e9' },
]

function getCalendarEvents(hour: string, dayIndex: number) {
  return calendarEventsData.filter(e => e.hour === hour && e.day === dayIndex)
}

// ─── Clientes ─────────────────────────────────────────────────────────────────
const demoClients = [
  { id: 1, name: 'Marina Costa',    initials: 'MC', color: '#10b981', email: 'marina@email.com',   phone: '(11) 99123-4567', cpf: '123.456.789-00', status: 'ativo',   date: '15/01/2024', totalSpent: 'R$1.240', totalAppts: 8,  points: 1240, lifetimePoints: 3200 },
  { id: 2, name: 'Ana Rodrigues',   initials: 'AR', color: '#6366f1', email: 'ana@email.com',       phone: '(11) 98765-4321', cpf: '987.654.321-00', status: 'ativo',   date: '03/02/2024', totalSpent: 'R$980',   totalAppts: 6,  points: 980,  lifetimePoints: 2100 },
  { id: 3, name: 'Beatriz Lima',    initials: 'BL', color: '#ec4899', email: 'beatriz@email.com',  phone: '(11) 97654-3210', cpf: '456.789.123-00', status: 'ativo',   date: '20/12/2023', totalSpent: 'R$2.340', totalAppts: 14, points: 2340, lifetimePoints: 5600 },
  { id: 4, name: 'Carla Souza',     initials: 'CS', color: '#8b5cf6', email: 'carla@email.com',     phone: '(11) 96543-2109', cpf: '321.654.987-00', status: 'ativo',   date: '10/03/2024', totalSpent: 'R$760',   totalAppts: 5,  points: 760,  lifetimePoints: 1200 },
  { id: 5, name: 'Juliana Mendes',  initials: 'JM', color: '#f59e0b', email: 'juliana@email.com',  phone: '(11) 95432-1098', cpf: '654.321.000-11', status: 'ativo',   date: '05/11/2023', totalSpent: 'R$1.850', totalAppts: 11, points: 1850, lifetimePoints: 4100 },
  { id: 6, name: 'Renata Ferreira', initials: 'RF', color: '#0ea5e9', email: 'renata@email.com',   phone: '(11) 94321-0987', cpf: '789.000.321-44', status: 'inativo', date: '18/09/2023', totalSpent: 'R$420',   totalAppts: 3,  points: 0,    lifetimePoints: 420  },
  { id: 7, name: 'Priscila Moraes', initials: 'PM', color: '#ef4444', email: 'priscila@email.com', phone: '(11) 93210-9876', cpf: '000.123.456-78', status: 'ativo',   date: '22/04/2024', totalSpent: 'R$620',   totalAppts: 4,  points: 620,  lifetimePoints: 620  },
  { id: 8, name: 'Daniela Gomes',   initials: 'DG', color: '#14b8a6', email: 'daniela@email.com',  phone: '(11) 92109-8765', cpf: '111.222.333-44', status: 'ativo',   date: '07/05/2024', totalSpent: 'R$480',   totalAppts: 3,  points: 480,  lifetimePoints: 480  },
]

const filteredClients = computed(() => {
  if (!clientSearch.value) return demoClients
  const q = clientSearch.value.toLowerCase()
  return demoClients.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.phone.includes(q)
  )
})

// ─── Serviços ─────────────────────────────────────────────────────────────────
const demoServices = [
  { id: 1, name: 'Coloração',             category: 'Cabelo',   duration: '2h',    price: 'R$120', count: 24, emoji: '🎨', color: '#10b981' },
  { id: 2, name: 'Corte + Escova',        category: 'Cabelo',   duration: '1h',    price: 'R$70',  count: 31, emoji: '✂️', color: '#6366f1' },
  { id: 3, name: 'Escova Progressiva',    category: 'Cabelo',   duration: '3h',    price: 'R$150', count: 12, emoji: '💆', color: '#f59e0b' },
  { id: 4, name: 'Hidratação',            category: 'Cabelo',   duration: '1h30',  price: 'R$70',  count: 18, emoji: '💧', color: '#0ea5e9' },
  { id: 5, name: 'Manicure',              category: 'Unhas',    duration: '45min', price: 'R$25',  count: 42, emoji: '💅', color: '#ec4899' },
  { id: 6, name: 'Pedicure',              category: 'Unhas',    duration: '1h',    price: 'R$35',  count: 28, emoji: '🦶', color: '#8b5cf6' },
  { id: 7, name: 'Design de Sobrancelha', category: 'Estética', duration: '30min', price: 'R$40',  count: 19, emoji: '👁️', color: '#ef4444' },
  { id: 8, name: 'Limpeza de Pele',       category: 'Estética', duration: '1h30',  price: 'R$90',  count: 9,  emoji: '✨', color: '#14b8a6' },
]

// ─── Profissionais ────────────────────────────────────────────────────────────
const demoEmployees = [
  { id: 1, name: 'Jéssica Alves',   initials: 'JA', color: '#10b981', role: 'Cabeleireira', email: 'jessica@studio.com',  revenue: 'R$3.420', appts: 38 },
  { id: 2, name: 'Camila Ferreira', initials: 'CF', color: '#6366f1', role: 'Cabeleireira', email: 'camila@studio.com',   revenue: 'R$2.610', appts: 29 },
  { id: 3, name: 'Fernanda Nunes',  initials: 'FN', color: '#f59e0b', role: 'Manicure',     email: 'fernanda@studio.com', revenue: 'R$1.540', appts: 22 },
  { id: 4, name: 'Roberta Dias',    initials: 'RD', color: '#ec4899', role: 'Esteticista',  email: 'roberta@studio.com',  revenue: 'R$1.120', appts: 15 },
]

// ─── Relatórios ───────────────────────────────────────────────────────────────
const reportMetrics = [
  { label: 'Receita Total',   value: 'R$24.180', sub: 'últimos 30 dias', bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200',  bar: 'bg-gradient-to-r from-emerald-400 to-teal-400',  labelColor: 'text-emerald-700', valueColor: 'text-emerald-700', periodColor: 'text-teal-500'  },
  { label: 'Agendamentos',    value: '218',       sub: 'no período',      bg: 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200',         bar: 'bg-gradient-to-r from-blue-400 to-sky-400',      labelColor: 'text-blue-700',    valueColor: 'text-blue-700',    periodColor: 'text-sky-500'   },
  { label: 'Clientes Ativos', value: '84',        sub: 'no período',      bg: 'bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-200', bar: 'bg-gradient-to-r from-violet-400 to-fuchsia-400', labelColor: 'text-violet-700',  valueColor: 'text-violet-700',  periodColor: 'text-purple-500'},
  { label: 'Comparecimento',  value: '93%',       sub: 'taxa de presença',bg: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',  bar: 'bg-gradient-to-r from-orange-400 to-amber-400',  labelColor: 'text-orange-700',  valueColor: 'text-orange-700',  periodColor: 'text-amber-600' },
]

const revenueBars = [
  { label: '01', value: 'R$680',   pct: 45  }, { label: '03', value: 'R$920',   pct: 61  },
  { label: '05', value: 'R$1.100', pct: 73  }, { label: '07', value: 'R$780',   pct: 52  },
  { label: '09', value: 'R$1.420', pct: 95  }, { label: '11', value: 'R$860',   pct: 57  },
  { label: '13', value: 'R$640',   pct: 43  }, { label: '15', value: 'R$1.500', pct: 100 },
  { label: '17', value: 'R$980',   pct: 65  }, { label: '19', value: 'R$1.200', pct: 80  },
  { label: '21', value: 'R$1.080', pct: 72  }, { label: '23', value: 'R$760',   pct: 51  },
  { label: '25', value: 'R$1.340', pct: 89  }, { label: '27', value: 'R$900',   pct: 60  },
  { label: '29', value: 'R$1.020', pct: 68  },
]

// ─── Metas ────────────────────────────────────────────────────────────────────
const demoGoals = [
  { id: 1, name: 'Negócio geral',   type: 'revenue',      current: 'R$24.180', target: 'R$30.000', pct: 80, employeeColor: null,      employeeInitials: null },
  { id: 2, name: 'Negócio geral',   type: 'appointments', current: '218',       target: '250',       pct: 87, employeeColor: null,      employeeInitials: null },
  { id: 3, name: 'Jéssica Alves',  type: 'revenue',      current: 'R$3.420',  target: 'R$4.000',  pct: 86, employeeColor: '#10b981', employeeInitials: 'JA' },
  { id: 4, name: 'Camila Ferreira',type: 'revenue',      current: 'R$2.610',  target: 'R$3.000',  pct: 87, employeeColor: '#6366f1', employeeInitials: 'CF' },
  { id: 5, name: 'Jéssica Alves',  type: 'appointments', current: '38',        target: '45',        pct: 84, employeeColor: '#10b981', employeeInitials: 'JA' },
  { id: 6, name: 'Fernanda Nunes', type: 'revenue',      current: 'R$1.540',  target: 'R$2.000',  pct: 77, employeeColor: '#f59e0b', employeeInitials: 'FN' },
]

// ─── Fidelidade ───────────────────────────────────────────────────────────────
const loyaltyTiers = [
  { key: 'bronze',  emoji: '🥉', label: 'Bronze',  threshold: '0',     border: 'border-amber-200 bg-amber-50',   text: 'text-amber-700'  },
  { key: 'silver',  emoji: '🥈', label: 'Silver',  threshold: '500',   border: 'border-gray-300 bg-gray-50',     text: 'text-gray-600'   },
  { key: 'gold',    emoji: '🥇', label: 'Gold',    threshold: '2.000', border: 'border-yellow-300 bg-yellow-50', text: 'text-yellow-700' },
  { key: 'diamond', emoji: '💎', label: 'Diamond', threshold: '5.000', border: 'border-blue-200 bg-blue-50',     text: 'text-blue-700'   },
]

// ─── Planos ───────────────────────────────────────────────────────────────────
const demoPlans = [
  {
    name: 'Profissional Solo', price: 'R$79,90', current: false, popular: false,
    features: ['1 profissional', '50 clientes', '100 agendamentos/mês', 'Agenda online', 'Site de agendamento'],
  },
  {
    name: 'Equipe Pequena', price: 'R$99,90', current: true, popular: true,
    features: ['Até 3 profissionais', 'Clientes ilimitados', 'Agendamentos ilimitados', 'Relatórios completos', 'Programa de fidelidade', 'Metas e indicadores', 'Suporte prioritário'],
  },
  {
    name: 'Equipe Média', price: 'R$149,90', current: false, popular: false,
    features: ['Até 6 profissionais', 'Múltiplas unidades', 'Tudo do Equipe Pequena', 'API de integração', 'Gerente de conta', 'Onboarding dedicado'],
  },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

aside::-webkit-scrollbar,
main::-webkit-scrollbar { width: 4px; }
aside::-webkit-scrollbar-thumb,
main::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
input[type='number'] { -moz-appearance: textfield; }
</style>