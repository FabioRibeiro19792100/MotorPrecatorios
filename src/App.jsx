import { useState, useEffect } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import './App.css'

// Configurar o worker do PDF.js
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`
}

const listaProcessos = [
  { arquivo: 'AIRR_0000380-12.2023.5.06.0103_3grau.pdf', nome: 'AIRR_0000380-12.2023.5.06.0103_3grau' },
  { arquivo: 'AIRR_0011624-68.2024.5.18.0102_3grau.pdf', nome: 'AIRR_0011624-68.2024.5.18.0102_3grau' },
  { arquivo: 'AIRR_1000110-74.2023.5.02.0040_3grau.pdf', nome: 'AIRR_1000110-74.2023.5.02.0040_3grau' },
  { arquivo: 'AIRR_1001992-03.2023.5.02.0386_3grau.pdf', nome: 'AIRR_1001992-03.2023.5.02.0386_3grau' },
  { arquivo: 'ANDREA HATSUMI_1001390-31.2020.5.02.0058 (1).pdf', nome: 'ANDREA HATSUMI' },
  { arquivo: 'ANELIZA_0010079-57.2024.5.18.0103 (1).pdf', nome: 'ANELIZA' },
  { arquivo: 'AP_0000153-82.2021.5.10.0005_2grau.pdf', nome: 'AP_0000153-82.2021.5.10.0005_2grau' },
  { arquivo: 'AP_0010074-41.2018.5.03.0013_2grau.pdf', nome: 'AP_0010074-41.2018.5.03.0013_2grau' },
  { arquivo: 'ATOrd_0000125-65.2016.5.05.0511_1grau (2).pdf', nome: 'ATOrd_0000125-65.2016.5.05.0511_1grau (2)' },
  { arquivo: 'ATOrd_0000176-48.2021.5.05.0011_1grau.pdf', nome: 'ATOrd_0000176-48.2021.5.05.0011_1grau' },
  { arquivo: 'ATOrd_0000403-06.2020.5.08.0103_1grau.pdf', nome: 'ATOrd_0000403-06.2020.5.08.0103_1grau' },
  { arquivo: 'ATOrd_0000556-75.2020.5.05.0021_1grau (1).pdf', nome: 'ATOrd_0000556-75.2020.5.05.0021_1grau (1)' },
  { arquivo: 'ATOrd_0001370-25.2019.5.10.0105_1grau.pdf', nome: 'ATOrd_0001370-25.2019.5.10.0105_1grau' },
  { arquivo: 'ATOrd_0010734-40.2015.5.03.0013_1grau.pdf', nome: 'ATOrd_0010734-40.2015.5.03.0013_1grau' },
  { arquivo: 'ATOrd_1000813-40.2022.5.02.0363_1grau.pdf', nome: 'ATOrd_1000813-40.2022.5.02.0363_1grau' },
  { arquivo: 'ATOrd_1000919-80.2019.5.02.0371_1grau.pdf', nome: 'ATOrd_1000919-80.2019.5.02.0371_1grau' },
  { arquivo: 'CLEUZENIR LIPU _0024944-20.2024.5.24.0006 (1).pdf', nome: 'CLEUZENIR LIPU' },
  { arquivo: 'CPSAC_0100548-15.2025.5.01.0063_1grau.pdf', nome: 'CPSAC_0100548-15.2025.5.01.0063_1grau' },
  { arquivo: 'CPSAC_1000372-50.2025.5.02.0720_1grau (1).pdf', nome: 'CPSAC_1000372-50.2025.5.02.0720_1grau (1)' },
  { arquivo: 'CPSAC_1000372-50.2025.5.02.0720_1grau (2).pdf', nome: 'CPSAC_1000372-50.2025.5.02.0720_1grau (2)' },
  { arquivo: 'CPSAC_1000372-50.2025.5.02.0720_1grau.pdf', nome: 'CPSAC_1000372-50.2025.5.02.0720_1grau' },
  { arquivo: 'CPSAC_1000440-18.2025.5.02.0714_1grau.pdf', nome: 'CPSAC_1000440-18.2025.5.02.0714_1grau' },
  { arquivo: 'CumPrSe_0020931-50.2022.5.04.0023_1grau.pdf', nome: 'CumPrSe_0020931-50.2022.5.04.0023_1grau' },
  { arquivo: 'CumSen_0010765-12.2025.5.03.0142_1grau.pdf', nome: 'CumSen_0010765-12.2025.5.03.0142_1grau' },
  { arquivo: 'DANIELA_0010978-59.2024.5.15.0064 (1).pdf', nome: 'DANIELA' },
  { arquivo: 'JOAO_GABRIEL_0010765-12.2025.5.03.0142 (1).pdf', nome: 'JOAO GABRIEL' },
  { arquivo: 'MARIA_ESTELA_0100259-86.2023.5.01.0052 (1).pdf', nome: 'MARIA ESTELA' },
  { arquivo: 'RAY FRANCISCO DE SOUSA AGUIAR LOBATO _1001881-50.2024.5.02.0041 (1).pdf', nome: 'RAY FRANCISCO' },
  { arquivo: 'RORSum_0010568-44.2025.5.03.0114_2grau.pdf', nome: 'RORSum_0010568-44.2025.5.03.0114_2grau' },
  { arquivo: 'RORSum_0011624-68.2024.5.18.0102_2grau.pdf', nome: 'RORSum_0011624-68.2024.5.18.0102_2grau' },
  { arquivo: 'RORSum_0024070-04.2024.5.24.0081_2grau.pdf', nome: 'RORSum_0024070-04.2024.5.24.0081_2grau' },
  { arquivo: 'ROSANA_1000924-56.2024.5.02.0071 (1).pdf', nome: 'ROSANA' },
  { arquivo: 'ROT_0000096-78.2025.5.14.0404_2grau (1).pdf', nome: 'ROT_0000096-78.2025.5.14.0404_2grau (1)' },
  { arquivo: 'ROT_0000356-97.2025.5.14.0003_2grau.pdf', nome: 'ROT_0000356-97.2025.5.14.0003_2grau' },
  { arquivo: 'ROT_0010590-28.2024.5.03.0150_2grau.pdf', nome: 'ROT_0010590-28.2024.5.03.0150_2grau' },
  { arquivo: 'ROT_0010812-16.2022.5.15.0058_2grau.pdf', nome: 'ROT_0010812-16.2022.5.15.0058_2grau' },
  { arquivo: 'ROT_0010960-39.2024.5.03.0107_2grau.pdf', nome: 'ROT_0010960-39.2024.5.03.0107_2grau' },
  { arquivo: 'ROT_0011962-51.2024.5.18.0002_2grau (1).pdf', nome: 'ROT_0011962-51.2024.5.18.0002_2grau (1)' },
  { arquivo: 'ROT_0011962-51.2024.5.18.0002_2grau.pdf', nome: 'ROT_0011962-51.2024.5.18.0002_2grau' },
  { arquivo: 'ROT_0020432-72.2023.5.04.0333_2grau (1).pdf', nome: 'ROT_0020432-72.2023.5.04.0333_2grau (1)' },
  { arquivo: 'ROT_0020432-72.2023.5.04.0333_2grau.pdf', nome: 'ROT_0020432-72.2023.5.04.0333_2grau' },
  { arquivo: 'ROT_1000110-74.2023.5.02.0040_2grau.pdf', nome: 'ROT_1000110-74.2023.5.02.0040_2grau' },
  { arquivo: 'ROT_1000230-41.2025.5.02.0463_2grau.pdf', nome: 'ROT_1000230-41.2025.5.02.0463_2grau' },
  { arquivo: 'ROT_1000622-12.2024.5.02.0464_2grau.pdf', nome: 'ROT_1000622-12.2024.5.02.0464_2grau' },
  { arquivo: 'ROT_1000979-07.2022.5.02.0708_2grau.pdf', nome: 'ROT_1000979-07.2022.5.02.0708_2grau' },
  { arquivo: 'ROT_1001710-06.2021.5.02.0201_2grau.pdf', nome: 'ROT_1001710-06.2021.5.02.0201_2grau' },
  { arquivo: 'ROT_1001732-77.2023.5.02.0465_2grau.pdf', nome: 'ROT_1001732-77.2023.5.02.0465_2grau' },
  { arquivo: 'RRAg_1000231-44.2023.5.02.0027_3grau.pdf', nome: 'RRAg_1000231-44.2023.5.02.0027_3grau' },
  { arquivo: 'SUELI_1001277-29.2020.5.02.0462 (1).pdf', nome: 'SUELI' },
  { arquivo: 'TAINA_1000366-50.2025.5.02.0362 (1).pdf', nome: 'TAINA' }
]

function App() {
  const [processoSelecionado, setProcessoSelecionado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState('analise') // 'analise' ou 'resumo'
  const [resultadosResumo, setResultadosResumo] = useState(new Map()) // Map<nomeProcesso, resultado>
  const [modeloAtivo, setModeloAtivo] = useState(1) // 1, 2, 3 ou 4
  const [mostrarArvoreRegras, setMostrarArvoreRegras] = useState(false)
  const [modeloRegras, setModeloRegras] = useState(1) // Modelo para visualizar regras (1, 2, 3 ou 4)
  const [buscaProcesso, setBuscaProcesso] = useState('') // Campo de busca por número de processo

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  // Função para extrair nome limpo (nome próprio ou número do processo)
  const extrairNomeLimpo = (nome, arquivo = null) => {
    // Se o nome não tem número de processo, é um nome próprio - retorna como está
    const temNumeroProcessoNoNome = /\d{4,}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4}/.test(nome)
    
    if (!temNumeroProcessoNoNome) {
      // É um nome próprio (ex: "ANDREA HATSUMI"), retorna como está
      return nome
    }
    
    // Se o nome tem número de processo, extrair apenas o número
    const matchNumero = nome.match(/(\d{4,}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4})/)
    if (matchNumero) {
      return matchNumero[1]
    }
    
    // Fallback: retorna o nome original se não conseguir extrair
    return nome
  }

  const extrairData = (texto) => {
    const padraoData = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g
    const match = padraoData.exec(texto)
    if (match) {
      const dia = parseInt(match[1])
      const mes = parseInt(match[2])
      const ano = parseInt(match[3])
      const anoCompleto = ano < 100 ? 2000 + ano : ano
      return new Date(anoCompleto, mes - 1, dia)
    }
    return null
  }

  const analisarPDF = async (nomeArquivo) => {
    const url = `/Processos/${encodeURIComponent(nomeArquivo)}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.status}`)
      }
      
      const arrayBuffer = await response.arrayBuffer()
      const pdfData = new Uint8Array(arrayBuffer)
      const pdf = await pdfjsLib.getDocument({ 
        data: pdfData,
        verbosity: 0,
        stopAtErrors: false,
        useSystemFonts: true
      }).promise
      
      const numPages = pdf.numPages
      console.log(`Total de páginas: ${numPages}`)
      
      // REGEX para valores
      const REGEX_VALOR = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
      
      // Converter valor para número (normalizar)
      const parseValor = (valorStr) => {
        if (!valorStr) return null
        const numeroStr = valorStr.replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.')
        const valor = parseFloat(numeroStr)
        return isNaN(valor) ? null : valor
      }
      
      // PASSO 2: BUSCAR VALORES E CONTAR PONTOS POR EXPRESSÕES
      // Regex1 (PRIORIDADE - EXATOS): palavras exatas com prioridade máxima
      const REGEX_EXPRESSOES_PRIORIDADE = /\b(condena|condenação|homologo|novo|nova|arbitra|rearbitra|arbitrado)\b/gi
      
      // Regex2 (SECUNDÁRIO - VARIAÇÕES): variações e outras palavras relevantes
      const REGEX_EXPRESSOES_SECUNDARIO = /(condenado|condenada|condenados|condenadas|atribui\w*|provisor\w*|majora\w*|diminui\w*|retifica\w*|fixa\w*|fixo\w*|debit\w*|homolog\w*|atualiz\w*)/gi
      
      const CONTEXTO_CHARS = 500 // 500 caracteres antes e depois do valor
      
      // PASSO 1: FOCAR NOS ÚLTIMOS 25% DO DOCUMENTO (com ampliação progressiva)
      let porcentagem = 0.50
      let valoresEncontrados = new Map() // Map<valorNumerico, {valorFormatado, pontos, paginas, contexto}>
      let paginaInicial, paginaFinal
      
      // Tentar diferentes porcentagens até encontrar valores ou chegar ao início
      while (porcentagem <= 1.0) {
        paginaInicial = Math.ceil(numPages * (1 - porcentagem)) + 1
        paginaFinal = numPages
        
        console.log(`Processando últimos ${(porcentagem * 100).toFixed(0)}%: páginas ${paginaInicial} a ${paginaFinal} (de ${numPages} páginas totais)`)
        
        // Resetar valores encontrados para nova tentativa
        valoresEncontrados = new Map()
        
        // Processar as páginas da porcentagem atual
        for (let i = paginaInicial; i <= paginaFinal; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map(item => item.str).join(' ')
        
        // Buscar todos os valores R$ na página
        REGEX_VALOR.lastIndex = 0
        let matchValor
        while ((matchValor = REGEX_VALOR.exec(pageText)) !== null) {
          const valorStr = matchValor[0]
          const valor = parseValor(valorStr)
          
          // Ignorar valores abaixo de R$ 15.000 ou acima de R$ 100 milhões
          if (!valor || valor < 15000 || valor > 100000000) continue
          
          // Normalizar o valor para agrupar
          const valorNormalizado = Math.round(valor)
          
          // Extrair contexto (500 chars antes e depois)
          const posValor = matchValor.index
          const inicioContexto = Math.max(0, posValor - CONTEXTO_CHARS)
          const fimContexto = Math.min(pageText.length, posValor + valorStr.length + CONTEXTO_CHARS)
          const contexto = pageText.substring(inicioContexto, fimContexto)
          const contextoLower = contexto.toLowerCase()
          
          // IMPORTANTE: Verificar se o valor monetário está presente no contexto
          // Se não estiver, ignorar esta ocorrência (não confiar na regra)
          if (!contexto.includes(valorStr)) {
            continue
          }
          
          // Contar quantas expressões aparecem no contexto e quais são
          // PRIMEIRO: verificar regex de prioridade (condena/homologo/novo/nova exatos)
          REGEX_EXPRESSOES_PRIORIDADE.lastIndex = 0
          const matchesPrioridade = contextoLower.match(REGEX_EXPRESSOES_PRIORIDADE)
          let palavrasPrioridade = matchesPrioridade 
            ? [...new Set(matchesPrioridade.map(m => m.toLowerCase()))]
            : []
          
          // SEGUNDO: verificar regex secundário
          let palavrasSecundario = []
          REGEX_EXPRESSOES_SECUNDARIO.lastIndex = 0
          const matchesSecundario = contextoLower.match(REGEX_EXPRESSOES_SECUNDARIO)
          const todasSecundarias = matchesSecundario 
            ? [...new Set(matchesSecundario.map(m => m.toLowerCase()))]
            : []
          
          if (palavrasPrioridade.length > 0) {
            // Se encontrou no primeiro regex (condena/homologo/novo/nova/arbitra/rearbitra/arbitrado exatos), 
            // busca outras palavras no segundo regex mas exclui apenas duplicatas exatas
            // NÃO excluir variações como "condenação" - elas devem contar também
            palavrasSecundario = todasSecundarias.filter(p => {
              // Não incluir se já está em palavrasPrioridade (evitar duplicata exata)
              const jaEstaEmPrioridade = palavrasPrioridade.some(prior => 
                prior === p || p === prior
              )
              // Não excluir "condenação" e outras variações - elas devem contar
              return !jaEstaEmPrioridade
            })
            // Verificar se "atualiz*" está no secundário e mover para prioridade
            const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
            if (atualizacoes.length > 0) {
              palavrasPrioridade = [...palavrasPrioridade, ...atualizacoes]
            }
          } else {
            // Se não encontrou no primeiro, verificar se tem "atualiz*" no secundário
            const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
            if (atualizacoes.length > 0) {
              palavrasPrioridade = atualizacoes
              palavrasSecundario = todasSecundarias.filter(p => !p.startsWith('atualiz'))
            } else {
              palavrasSecundario = todasSecundarias
            }
          }
          
          // Combinar: palavras de prioridade primeiro, depois secundárias
          let palavrasEncontradas = [...palavrasPrioridade, ...palavrasSecundario]
          
          // Pontos = número de palavras únicas (não conta repetições)
          const pontos = palavrasEncontradas.length
          
          // Se não encontrou nenhuma expressão, ignorar
          if (pontos === 0) continue
          
          if (valoresEncontrados.has(valorNormalizado)) {
            const entrada = valoresEncontrados.get(valorNormalizado)
            // Usar a MAIOR pontuação encontrada (não somar)
            if (pontos > entrada.pontos) {
              entrada.pontos = pontos
              entrada.contexto = contexto.trim()
              entrada.paginaContexto = i // Página de onde veio o contexto
              // Atualizar as palavras para serem apenas as da ocorrência com maior pontuação
              entrada.palavrasEncontradas = palavrasEncontradas
            }
            // Não acumular palavras de outras ocorrências, apenas manter as da maior pontuação
            if (!entrada.paginas.includes(i)) {
              entrada.paginas.push(i)
            }
          } else {
            valoresEncontrados.set(valorNormalizado, {
              valorFormatado: formatarMoeda(valor),
              pontos: pontos,
              paginas: [i],
              contexto: contexto.trim(),
              paginaContexto: i, // Página de onde veio o contexto
              palavrasEncontradas: palavrasEncontradas
            })
          }
        }
        
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 10))
        }
      }
      
      // Se encontrou valores, parar a busca
      if (valoresEncontrados.size > 0) {
        console.log(`Encontrados ${valoresEncontrados.size} valores únicos com expressões relevantes nos últimos ${(porcentagem * 100).toFixed(0)}%`)
        break
      }
      
      // Se não encontrou valores e ainda não chegou ao início, aumentar porcentagem em 10%
      if (valoresEncontrados.size === 0 && porcentagem < 1.0) {
        porcentagem += 0.10
        console.log(`Nenhum valor encontrado. Ampliando busca para últimos ${(porcentagem * 100).toFixed(0)}%...`)
      } else {
        break // Chegou ao início do documento
      }
    }
      
      if (valoresEncontrados.size === 0) {
        console.log(`Nenhum valor encontrado em todo o documento`)
      }
      
      // Ordenar por pontos (mais pontos = maior probabilidade)
      // Mas priorizar valores que contenham "condena" mesmo com menos pontos
      const valoresOrdenados = Array.from(valoresEncontrados.entries())
        .map(([valorNumerico, dados]) => ({
          valorNumerico: valorNumerico, // Manter o valor numérico para comparação
          valor: dados.valorFormatado,
          pontos: dados.pontos,
          paginas: dados.paginas,
          contexto: dados.contexto,
          paginaContexto: dados.paginaContexto, // Página de onde veio o contexto
          palavrasEncontradas: dados.palavrasEncontradas || []
        }))
        .sort((a, b) => {
          // Verificar palavras de prioridade
          const aTemCondena = a.palavrasEncontradas.some(p => p === 'condena')
          const bTemCondena = b.palavrasEncontradas.some(p => p === 'condena')
          const aTemHomologo = a.palavrasEncontradas.some(p => p === 'homologo')
          const bTemHomologo = b.palavrasEncontradas.some(p => p === 'homologo')
          const aTemNovo = a.palavrasEncontradas.some(p => p === 'novo' || p === 'nova')
          const bTemNovo = b.palavrasEncontradas.some(p => p === 'novo' || p === 'nova')
          const aTemArbitra = a.palavrasEncontradas.some(p => p === 'arbitra' || p === 'rearbitra' || p === 'arbitrado')
          const bTemArbitra = b.palavrasEncontradas.some(p => p === 'arbitra' || p === 'rearbitra' || p === 'arbitrado')
          const aTemAtualiz = a.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          const bTemAtualiz = b.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          
          // Contar quantas palavras prioritárias cada valor tem
          const contarPrioritarias = (palavras) => {
            let count = 0
            if (palavras.some(p => p === 'homologo')) count++
            if (palavras.some(p => p === 'condena')) count++
            if (palavras.some(p => p === 'novo' || p === 'nova')) count++
            if (palavras.some(p => p === 'arbitra' || p === 'rearbitra' || p === 'arbitrado')) count++
            if (palavras.some(p => p.startsWith('atualiz'))) count++
            return count
          }
          
          const aPrioritarias = contarPrioritarias(a.palavrasEncontradas)
          const bPrioritarias = contarPrioritarias(b.palavrasEncontradas)
          
          // 1. Prioridade máxima: "homologo" exato
          if (aTemHomologo && !bTemHomologo) return -1
          if (!aTemHomologo && bTemHomologo) return 1
          if (aTemHomologo && bTemHomologo) {
            // Desempate: quem tem mais palavras prioritárias
            if (aPrioritarias !== bPrioritarias) return bPrioritarias - aPrioritarias
            return b.pontos - a.pontos
          }
          
          // Se nenhum tem "homologo", verificar "condena"
          if (!aTemHomologo && !bTemHomologo) {
            // 2. Segunda prioridade: "condena" exata
            if (aTemCondena && !bTemCondena) return -1
            if (!aTemCondena && bTemCondena) return 1
            
            // Se ambos têm "condena", verificar qual tem APENAS "condena" (sem variações)
            if (aTemCondena && bTemCondena) {
              const palavrasCondenaA = a.palavrasEncontradas.filter(p => p.startsWith('condena'))
              const palavrasCondenaB = b.palavrasEncontradas.filter(p => p.startsWith('condena'))
              
              const aTemApenasCondena = palavrasCondenaA.length === 1 && palavrasCondenaA[0] === 'condena'
              const bTemApenasCondena = palavrasCondenaB.length === 1 && palavrasCondenaB[0] === 'condena'
              
              if (aTemApenasCondena && !bTemApenasCondena) return -1
              if (!aTemApenasCondena && bTemApenasCondena) return 1
              
              // Desempate: quem tem mais palavras prioritárias
              if (aPrioritarias !== bPrioritarias) return bPrioritarias - aPrioritarias
              return b.pontos - a.pontos
            }
            
            // Se nenhum tem "condena", verificar "novo/nova"
            if (!aTemCondena && !bTemCondena) {
              // 3. Terceira prioridade: "novo" ou "nova" exatos
              if (aTemNovo && !bTemNovo) return -1
              if (!aTemNovo && bTemNovo) return 1
              if (aTemNovo && bTemNovo) {
                // Desempate: quem tem mais palavras prioritárias
                if (aPrioritarias !== bPrioritarias) return bPrioritarias - aPrioritarias
                return b.pontos - a.pontos
              }
              
              // Se nenhum tem "novo/nova", verificar "arbitra/rearbitra"
              if (!aTemNovo && !bTemNovo) {
                // 4. Quarta prioridade: "arbitra" ou "rearbitra" exatos
                if (aTemArbitra && !bTemArbitra) return -1
                if (!aTemArbitra && bTemArbitra) return 1
                if (aTemArbitra && bTemArbitra) {
                  // Desempate: quem tem mais palavras prioritárias
                  if (aPrioritarias !== bPrioritarias) return bPrioritarias - aPrioritarias
                  return b.pontos - a.pontos
                }
                
                // Se nenhum tem "arbitra/rearbitra", verificar "atualiz*"
                if (!aTemArbitra && !bTemArbitra) {
                  // 5. Quinta prioridade: "atualiz*"
                  if (aTemAtualiz && !bTemAtualiz) return -1
                  if (!aTemAtualiz && bTemAtualiz) return 1
                  if (aTemAtualiz && bTemAtualiz) {
                    // Desempate: quem tem mais palavras prioritárias
                    if (aPrioritarias !== bPrioritarias) return bPrioritarias - aPrioritarias
                    return b.pontos - a.pontos
                  }
                }
              }
            }
            
            // 5. Se nenhum tem prioridade, ordenar por pontos
            return b.pontos - a.pontos
          }
          
          // Caso de fallback
          return b.pontos - a.pontos
        })
      
      console.log('Valores ordenados por pontos:', valoresOrdenados.slice(0, 5).map(v => ({
        valor: v.valor,
        pontos: v.pontos,
        palavras: v.palavrasEncontradas,
        temCondena: v.palavrasEncontradas.some(p => p === 'condena'),
        temHomologo: v.palavrasEncontradas.some(p => p === 'homologo')
      })))
      
      // Pegar o valor com mais pontos
      const valorMaisProvavel = valoresOrdenados.length > 0 ? valoresOrdenados[0] : null
      
      return {
        valorAReceber: valorMaisProvavel ? valorMaisProvavel.valor : null,
        pontos: valorMaisProvavel ? valorMaisProvavel.pontos : 0,
        palavrasEncontradas: valorMaisProvavel ? valorMaisProvavel.palavrasEncontradas : [],
        contexto: valorMaisProvavel ? valorMaisProvavel.contexto : null,
        paginas: valorMaisProvavel ? valorMaisProvavel.paginas : [],
        encontrado: valorMaisProvavel !== null,
        todosValores: valoresOrdenados // Lista completa ordenada por pontos
      }
      
    } catch (error) {
      console.error('Erro ao processar PDF:', error)
      throw error
    }
  }

  // Modelo 2: Limite reduzido se não houver resultados + prioriza valores maiores quando há palavras prioritárias
  const analisarPDFModelo2 = async (nomeArquivo) => {
    const url = `/Processos/${encodeURIComponent(nomeArquivo)}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.status}`)
      }
      
      const arrayBuffer = await response.arrayBuffer()
      const pdfData = new Uint8Array(arrayBuffer)
      const pdf = await pdfjsLib.getDocument({ 
        data: pdfData,
        verbosity: 0,
        stopAtErrors: false,
        useSystemFonts: true
      }).promise
      
      const numPages = pdf.numPages
      console.log(`[Motor 2] Total de páginas: ${numPages}`)
      
      const REGEX_VALOR = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
      
      const parseValor = (valorStr) => {
        if (!valorStr) return null
        const numeroStr = valorStr.replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.')
        const valor = parseFloat(numeroStr)
        return isNaN(valor) ? null : valor
      }
      
      const REGEX_EXPRESSOES_PRIORIDADE = /\b(condena|condenação|homologo|novo|nova|arbitra|rearbitra|arbitrado)\b/gi
      const REGEX_EXPRESSOES_SECUNDARIO = /(condenado|condenada|condenados|condenadas|atribui\w*|diminui\w*|retifica\w*|fixa\w*|fixo\w*|debit\w*|homolog\w*|atualiz\w*|execu\w*)/gi
      const CONTEXTO_CHARS = 500
      
      // Se o documento tem menos de 100 páginas, escanear 100% do documento
      let porcentagem = numPages < 100 ? 1.0 : 0.50
      let valoresEncontrados = new Map()
      let paginaInicial, paginaFinal
      let limiteMinimo = 1000 // Começar com R$ 1.000
      
      // Tentar primeiro com limite de R$ 1.000
      while (porcentagem <= 1.0) {
        paginaInicial = Math.ceil(numPages * (1 - porcentagem)) + 1
        paginaFinal = numPages
        
        console.log(`[Motor 2] Processando últimos ${(porcentagem * 100).toFixed(0)}%: páginas ${paginaInicial} a ${paginaFinal} (limite: R$ ${limiteMinimo.toLocaleString('pt-BR')})`)
        
        valoresEncontrados = new Map()
        
        for (let i = paginaInicial; i <= paginaFinal; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          const pageText = textContent.items.map(item => item.str).join(' ')
          
          REGEX_VALOR.lastIndex = 0
          let matchValor
          while ((matchValor = REGEX_VALOR.exec(pageText)) !== null) {
            const valorStr = matchValor[0]
            const valor = parseValor(valorStr)
            
            // Usar limite dinâmico (mínimo e máximo)
            if (!valor || valor < limiteMinimo || valor > 100000000) continue
            
            const valorNormalizado = Math.round(valor)
            
            const posValor = matchValor.index
            const inicioContexto = Math.max(0, posValor - CONTEXTO_CHARS)
            const fimContexto = Math.min(pageText.length, posValor + valorStr.length + CONTEXTO_CHARS)
            const contexto = pageText.substring(inicioContexto, fimContexto)
            const contextoLower = contexto.toLowerCase()
            
            if (!contexto.includes(valorStr)) continue
            
            // Verificar se "honorarios" está a menos de 3 palavras do valor - se sim, desconsiderar
            const regexHonorarios = /\bhonor[áa]rio\w*\b/gi
            const posValorNoContexto = posValor - inicioContexto
            let matchHonorarios
            regexHonorarios.lastIndex = 0
            let deveDesconsiderar = false
            
            while ((matchHonorarios = regexHonorarios.exec(contexto)) !== null) {
              const posHonorarios = matchHonorarios.index
              const fimHonorarios = posHonorarios + matchHonorarios[0].length
              
              // Se "honorarios" está antes do valor
              if (fimHonorarios < posValorNoContexto) {
                // Pegar o texto entre "honorarios" e o valor
                const textoEntre = contexto.substring(fimHonorarios, posValorNoContexto)
                // Contar palavras usando o regex de palavras
                const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
                if (palavrasEntre.length < 3) {
                  deveDesconsiderar = true
                  break
                }
              }
              // Se "honorarios" está depois do valor
              else if (posHonorarios > posValorNoContexto + valorStr.length) {
                // Pegar o texto entre o valor e "honorarios"
                const textoEntre = contexto.substring(posValorNoContexto + valorStr.length, posHonorarios)
                // Contar palavras usando o regex de palavras
                const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
                if (palavrasEntre.length < 3) {
                  deveDesconsiderar = true
                  break
                }
              }
              // Se "honorarios" está sobreposto ou muito próximo
              else {
                deveDesconsiderar = true
                break
              }
            }
            
            if (deveDesconsiderar) continue
            
            REGEX_EXPRESSOES_PRIORIDADE.lastIndex = 0
            const matchesPrioridade = contextoLower.match(REGEX_EXPRESSOES_PRIORIDADE)
            let palavrasPrioridade = matchesPrioridade 
              ? [...new Set(matchesPrioridade.map(m => m.toLowerCase()))]
              : []
            
            let palavrasSecundario = []
            REGEX_EXPRESSOES_SECUNDARIO.lastIndex = 0
            const matchesSecundario = contextoLower.match(REGEX_EXPRESSOES_SECUNDARIO)
            const todasSecundarias = matchesSecundario 
              ? [...new Set(matchesSecundario.map(m => m.toLowerCase()))]
              : []
            
            if (palavrasPrioridade.length > 0) {
              palavrasSecundario = todasSecundarias.filter(p => {
                const jaEstaEmPrioridade = palavrasPrioridade.some(prior => 
                  prior === p || p === prior
                )
                return !jaEstaEmPrioridade
              })
              const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
              if (atualizacoes.length > 0) {
                palavrasPrioridade = [...palavrasPrioridade, ...atualizacoes]
              }
            } else {
              const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
              if (atualizacoes.length > 0) {
                palavrasPrioridade = atualizacoes
                palavrasSecundario = todasSecundarias.filter(p => !p.startsWith('atualiz'))
              } else {
                palavrasSecundario = todasSecundarias
              }
            }
            
            let palavrasEncontradas = [...palavrasPrioridade, ...palavrasSecundario]
            const pontos = palavrasEncontradas.length
            
            // Verificar se "condenação" está a 50 caracteres ou menos ANTES do valor
            let condenacaoProxima = false
            const regexCondenacao = /\bcondenação\b/gi
            // posValorNoContexto já foi declarado acima (linha 519)
            let matchCondenacao
            regexCondenacao.lastIndex = 0
            while ((matchCondenacao = regexCondenacao.exec(contexto)) !== null) {
              const posCondenacao = matchCondenacao.index
              // Verificar se está ANTES do valor e a distância é <= 50
              if (posCondenacao < posValorNoContexto) {
                const distancia = posValorNoContexto - posCondenacao
                if (distancia <= 50) {
                  condenacaoProxima = true
                  break
                }
              }
            }
            
            if (pontos === 0) continue
            
            if (valoresEncontrados.has(valorNormalizado)) {
              const entrada = valoresEncontrados.get(valorNormalizado)
              // Priorizar ocorrência com condenacaoProxima ou maior pontuação
              if (condenacaoProxima && !entrada.condenacaoProxima) {
                entrada.pontos = pontos
                entrada.contexto = contexto.trim()
                entrada.paginaContexto = i
                entrada.palavrasEncontradas = palavrasEncontradas
                entrada.condenacaoProxima = true
              } else if (pontos > entrada.pontos && !entrada.condenacaoProxima) {
                entrada.pontos = pontos
                entrada.contexto = contexto.trim()
                entrada.paginaContexto = i
                entrada.palavrasEncontradas = palavrasEncontradas
              }
              if (!entrada.paginas.includes(i)) {
                entrada.paginas.push(i)
              }
            } else {
              valoresEncontrados.set(valorNormalizado, {
                valorFormatado: formatarMoeda(valor),
                pontos: pontos,
                paginas: [i],
                contexto: contexto.trim(),
                paginaContexto: i,
                palavrasEncontradas: palavrasEncontradas,
                condenacaoProxima: condenacaoProxima
              })
            }
          }
          
          if (i % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 10))
          }
        }
        
        if (valoresEncontrados.size > 0) {
          console.log(`[Motor 2] Encontrados ${valoresEncontrados.size} valores únicos com limite de R$ ${limiteMinimo.toLocaleString('pt-BR')}`)
          break
        }
        
        if (valoresEncontrados.size === 0 && porcentagem < 1.0) {
          porcentagem += 0.10
          console.log(`[Motor 2] Nenhum valor encontrado. Ampliando busca para últimos ${(porcentagem * 100).toFixed(0)}%...`)
        } else {
          break
        }
      }
      
      // Se não encontrou nada com R$ 1.000, tentar com R$ 500
      if (valoresEncontrados.size === 0 && limiteMinimo === 1000) {
        console.log(`[Motor 2] Nenhum valor encontrado com limite de R$ 1.000. Reduzindo para R$ 500...`)
        limiteMinimo = 500
        porcentagem = numPages < 100 ? 1.0 : 0.50 // Resetar porcentagem (100% se < 100 páginas)
        
        while (porcentagem <= 1.0) {
          paginaInicial = Math.ceil(numPages * (1 - porcentagem)) + 1
          paginaFinal = numPages
          
          console.log(`[Motor 2] Processando últimos ${(porcentagem * 100).toFixed(0)}%: páginas ${paginaInicial} a ${paginaFinal} (limite: R$ ${limiteMinimo.toLocaleString('pt-BR')})`)
          
          valoresEncontrados = new Map()
          
          for (let i = paginaInicial; i <= paginaFinal; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map(item => item.str).join(' ')
            
            REGEX_VALOR.lastIndex = 0
            let matchValor
            while ((matchValor = REGEX_VALOR.exec(pageText)) !== null) {
              const valorStr = matchValor[0]
              const valor = parseValor(valorStr)
              
              if (!valor || valor < limiteMinimo) continue
              
              const valorNormalizado = Math.round(valor)
              
              const posValor = matchValor.index
              const inicioContexto = Math.max(0, posValor - CONTEXTO_CHARS)
              const fimContexto = Math.min(pageText.length, posValor + valorStr.length + CONTEXTO_CHARS)
              const contexto = pageText.substring(inicioContexto, fimContexto)
              const contextoLower = contexto.toLowerCase()
              
              if (!contexto.includes(valorStr)) continue
              
              // Verificar se "honorarios" está a menos de 3 palavras do valor - se sim, desconsiderar
              const regexHonorarios2 = /\bhonor[áa]rio\w*\b/gi
              const posValorNoContexto2 = posValor - inicioContexto
              let matchHonorarios2
              regexHonorarios2.lastIndex = 0
              let deveDesconsiderar2 = false
              
              while ((matchHonorarios2 = regexHonorarios2.exec(contexto)) !== null) {
                const posHonorarios = matchHonorarios2.index
                const fimHonorarios = posHonorarios + matchHonorarios2[0].length
                
                // Se "honorarios" está antes do valor
                if (fimHonorarios < posValorNoContexto2) {
                  // Pegar o texto entre "honorarios" e o valor
                  const textoEntre = contexto.substring(fimHonorarios, posValorNoContexto2)
                  // Contar palavras usando o regex de palavras
                  const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
                  if (palavrasEntre.length < 3) {
                    deveDesconsiderar2 = true
                    break
                  }
                }
                // Se "honorarios" está depois do valor
                else if (posHonorarios > posValorNoContexto2 + valorStr.length) {
                  // Pegar o texto entre o valor e "honorarios"
                  const textoEntre = contexto.substring(posValorNoContexto2 + valorStr.length, posHonorarios)
                  // Contar palavras usando o regex de palavras
                  const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
                  if (palavrasEntre.length < 3) {
                    deveDesconsiderar2 = true
                    break
                  }
                }
                // Se "honorarios" está sobreposto ou muito próximo
                else {
                  deveDesconsiderar2 = true
                  break
                }
              }
              
              if (deveDesconsiderar2) continue
              
              REGEX_EXPRESSOES_PRIORIDADE.lastIndex = 0
              const matchesPrioridade = contextoLower.match(REGEX_EXPRESSOES_PRIORIDADE)
              let palavrasPrioridade = matchesPrioridade 
                ? [...new Set(matchesPrioridade.map(m => m.toLowerCase()))]
                : []
              
              let palavrasSecundario = []
              REGEX_EXPRESSOES_SECUNDARIO.lastIndex = 0
              const matchesSecundario = contextoLower.match(REGEX_EXPRESSOES_SECUNDARIO)
              const todasSecundarias = matchesSecundario 
                ? [...new Set(matchesSecundario.map(m => m.toLowerCase()))]
                : []
              
              if (palavrasPrioridade.length > 0) {
                palavrasSecundario = todasSecundarias.filter(p => {
                  const jaEstaEmPrioridade = palavrasPrioridade.some(prior => 
                    prior === p || p === prior
                  )
                  return !jaEstaEmPrioridade
                })
                const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
                if (atualizacoes.length > 0) {
                  palavrasPrioridade = [...palavrasPrioridade, ...atualizacoes]
                }
              } else {
                const atualizacoes = todasSecundarias.filter(p => p.startsWith('atualiz'))
                if (atualizacoes.length > 0) {
                  palavrasPrioridade = atualizacoes
                  palavrasSecundario = todasSecundarias.filter(p => !p.startsWith('atualiz'))
                } else {
                  palavrasSecundario = todasSecundarias
                }
              }
              
              let palavrasEncontradas = [...palavrasPrioridade, ...palavrasSecundario]
              const pontos = palavrasEncontradas.length
              
              // Verificar se "condenação" está a 50 caracteres ou menos ANTES do valor
              let condenacaoProxima = false
              const regexCondenacao2 = /\bcondenação\b/gi
              // posValorNoContexto2 já foi declarado acima (linha 704)
              let matchCondenacao2
              regexCondenacao2.lastIndex = 0
              while ((matchCondenacao2 = regexCondenacao2.exec(contexto)) !== null) {
                const posCondenacao = matchCondenacao2.index
                // Verificar se está ANTES do valor e a distância é <= 50
                if (posCondenacao < posValorNoContexto2) {
                  const distancia = posValorNoContexto2 - posCondenacao
                  if (distancia <= 50) {
                    condenacaoProxima = true
                    break
                  }
                }
              }
              
              if (pontos === 0) continue
              
              if (valoresEncontrados.has(valorNormalizado)) {
                const entrada = valoresEncontrados.get(valorNormalizado)
                // Priorizar ocorrência com condenacaoProxima ou maior pontuação
                if (condenacaoProxima && !entrada.condenacaoProxima) {
                  entrada.pontos = pontos
                  entrada.contexto = contexto.trim()
                  entrada.paginaContexto = i
                  entrada.palavrasEncontradas = palavrasEncontradas
                  entrada.condenacaoProxima = true
                } else if (pontos > entrada.pontos && !entrada.condenacaoProxima) {
                  entrada.pontos = pontos
                  entrada.contexto = contexto.trim()
                  entrada.paginaContexto = i
                  entrada.palavrasEncontradas = palavrasEncontradas
                }
                if (!entrada.paginas.includes(i)) {
                  entrada.paginas.push(i)
                }
              } else {
                valoresEncontrados.set(valorNormalizado, {
                  valorFormatado: formatarMoeda(valor),
                  pontos: pontos,
                  paginas: [i],
                  contexto: contexto.trim(),
                  paginaContexto: i,
                  palavrasEncontradas: palavrasEncontradas,
                  condenacaoProxima: condenacaoProxima
                })
              }
            }
            
            if (i % 10 === 0) {
              await new Promise(resolve => setTimeout(resolve, 10))
            }
          }
          
          if (valoresEncontrados.size > 0) {
            console.log(`[Motor 2] Encontrados ${valoresEncontrados.size} valores únicos com limite de R$ ${limiteMinimo.toLocaleString('pt-BR')}`)
            break
          }
          
          if (valoresEncontrados.size === 0 && porcentagem < 1.0) {
            porcentagem += 0.10
            console.log(`[Motor 2] Nenhum valor encontrado. Ampliando busca para últimos ${(porcentagem * 100).toFixed(0)}%...`)
          } else {
            break
          }
        }
      }
      
      if (valoresEncontrados.size === 0) {
        console.log(`[Motor 2] Nenhum valor encontrado em todo o documento`)
      }
      
      // Ordenação do Motor 2: respeita hierarquia de prioridade, mas quando há empate na mesma categoria, ordena por valor maior
      const valoresOrdenados = Array.from(valoresEncontrados.entries())
        .map(([valorNumerico, dados]) => ({
          valorNumerico: valorNumerico,
          valor: dados.valorFormatado,
          pontos: dados.pontos,
          paginas: dados.paginas,
          contexto: dados.contexto,
          paginaContexto: dados.paginaContexto,
          palavrasEncontradas: dados.palavrasEncontradas || [],
          condenacaoProxima: dados.condenacaoProxima || false
        }))
        .sort((a, b) => {
          // Verificar se tem borda vermelha (condena ou homologo)
          // APENAS "homologo" exato é considerado borda vermelha, não variações como "homologado"
          const aTemCondena = a.palavrasEncontradas.some(p => p === 'condena' || p === 'condenação')
          const bTemCondena = b.palavrasEncontradas.some(p => p === 'condena' || p === 'condenação')
          const aTemHomologo = a.palavrasEncontradas.some(p => p === 'homologo')
          const bTemHomologo = b.palavrasEncontradas.some(p => p === 'homologo')
          
          const aTemBordaVermelha = aTemCondena || aTemHomologo
          const bTemBordaVermelha = bTemCondena || bTemHomologo
          
          // PRIORIDADE ABSOLUTA: Valores com borda vermelha sempre vêm antes de valores sem borda vermelha
          if (aTemBordaVermelha && !bTemBordaVermelha) return -1
          if (!aTemBordaVermelha && bTemBordaVermelha) return 1
          
          // Se ambos têm borda vermelha, aplicar regras de ordenação dentro do grupo de borda vermelha
          if (aTemBordaVermelha && bTemBordaVermelha) {
            // 1. Valores com 4 ou mais pontos E borda vermelha - prioridade máxima dentro do grupo
            const aTem4OuMaisPontos = a.pontos >= 4
            const bTem4OuMaisPontos = b.pontos >= 4
            
            if (aTem4OuMaisPontos && !bTem4OuMaisPontos) return -1
            if (!aTem4OuMaisPontos && bTem4OuMaisPontos) return 1
            if (aTem4OuMaisPontos && bTem4OuMaisPontos) {
              // Ambos têm 4+ pontos: ordenar por pontos (mais pontos primeiro), em empate por valor maior
              if (b.pontos !== a.pontos) return b.pontos - a.pontos
              return b.valorNumerico - a.valorNumerico
            }
            
            // 2. Verificar se "condenação" está próxima (50 chars antes)
            const aCondenacaoProxima = a.condenacaoProxima || false
            const bCondenacaoProxima = b.condenacaoProxima || false
            
            if (aCondenacaoProxima && !bCondenacaoProxima) return -1
            if (!aCondenacaoProxima && bCondenacaoProxima) return 1
            if (aCondenacaoProxima && bCondenacaoProxima) {
              // Ambos têm condenação próxima: ordenar por pontos, em empate por valor maior
              if (b.pontos !== a.pontos) return b.pontos - a.pontos
              return b.valorNumerico - a.valorNumerico
            }
            
            // 3. Ordenar por pontos primeiro (mais pontos primeiro)
            if (b.pontos !== a.pontos) return b.pontos - a.pontos
            
            // 4. Em empate de pontos, priorizar "homologo" sobre "condena"
            if (aTemHomologo && !bTemHomologo) return -1
            if (!aTemHomologo && bTemHomologo) return 1
            
            // 5. Se ambos têm a mesma palavra prioritária ou empate, ordenar por valor maior
            return b.valorNumerico - a.valorNumerico
          }
          
          // Se nenhum tem borda vermelha, aplicar outras regras de prioridade
          const aTemNovo = a.palavrasEncontradas.some(p => p === 'novo' || p === 'nova')
          const bTemNovo = b.palavrasEncontradas.some(p => p === 'novo' || p === 'nova')
          const aTemArbitra = a.palavrasEncontradas.some(p => p === 'arbitra' || p === 'rearbitra' || p === 'arbitrado')
          const bTemArbitra = b.palavrasEncontradas.some(p => p === 'arbitra' || p === 'rearbitra' || p === 'arbitrado')
          const aTemAtualiz = a.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          const bTemAtualiz = b.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          
          // 1. Terceira prioridade: "novo" ou "nova"
          if (aTemNovo && !bTemNovo) return -1
          if (!aTemNovo && bTemNovo) return 1
          if (aTemNovo && bTemNovo) {
            // Ambos têm novo/nova: ordenar por valor maior (Motor 2)
            return b.valorNumerico - a.valorNumerico
          }
          
          // 2. Quarta prioridade: "arbitra", "rearbitra" ou "arbitrado"
          if (aTemArbitra && !bTemArbitra) return -1
          if (!aTemArbitra && bTemArbitra) return 1
          if (aTemArbitra && bTemArbitra) {
            // Ambos têm arbitra: ordenar por valor maior (Motor 2)
            return b.valorNumerico - a.valorNumerico
          }
          
          // 3. Quinta prioridade: "atualiz*"
          if (aTemAtualiz && !bTemAtualiz) return -1
          if (!aTemAtualiz && bTemAtualiz) return 1
          if (aTemAtualiz && bTemAtualiz) {
            // Ambos têm atualiz: ordenar por valor maior (Motor 2)
            return b.valorNumerico - a.valorNumerico
          }
          
          // VERIFICAÇÃO DE SEGURANÇA FINAL: Garantir que valores com borda vermelha sempre vêm antes
          // (caso alguma lógica anterior tenha permitido que passassem)
          if (aTemBordaVermelha && !bTemBordaVermelha) return -1
          if (!aTemBordaVermelha && bTemBordaVermelha) return 1
          
          // Se nenhum tem prioridade, ordenar por pontos
          return b.pontos - a.pontos
        })
      
      const valorMaisProvavel = valoresOrdenados.length > 0 ? valoresOrdenados[0] : null
      
      return {
        valorAReceber: valorMaisProvavel ? valorMaisProvavel.valor : null,
        pontos: valorMaisProvavel ? valorMaisProvavel.pontos : 0,
        palavrasEncontradas: valorMaisProvavel ? valorMaisProvavel.palavrasEncontradas : [],
        contexto: valorMaisProvavel ? valorMaisProvavel.contexto : null,
        paginas: valorMaisProvavel ? valorMaisProvavel.paginas : [],
        encontrado: valorMaisProvavel !== null,
        todosValores: valoresOrdenados
      }
      
    } catch (error) {
      console.error('Erro ao processar PDF:', error)
      throw error
    }
  }

  // Modelo 3: Versão otimizada e organizada baseada no código fornecido
  const analisarPDFModelo3 = async (nomeArquivo) => {
    const url = `/Processos/${encodeURIComponent(nomeArquivo)}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.status}`)
      }
      
      const arrayBuffer = await response.arrayBuffer()
      const pdfData = new Uint8Array(arrayBuffer)
      const pdf = await pdfjsLib.getDocument({ 
        data: pdfData,
        verbosity: 0,
        stopAtErrors: false,
        useSystemFonts: true
      }).promise
      
      const numPages = pdf.numPages
      console.log(`[Motor 3] Total de páginas: ${numPages}`)
      
      // ============================================
      // CONFIGURAÇÕES E CONSTANTES
      // ============================================
      const CONFIG = {
        LIMITE_MIN_INICIAL: 1000,
        LIMITE_MIN_ALTERNATIVO: 500,
        LIMITE_MAX: 100000000,
        LIMITE_EXIBICAO: 15000,
        TAMANHO_CONTEXTO: 500,
        DISTANCIA_HONORARIOS: 3,
        DISTANCIA_CONDENACAO: 50,
        MAX_RESULTADOS: 4,
        THRESHOLD_PAGINAS_GRANDE: 100
      }
      
      const PALAVRAS = {
        prioritariasExatas: ['condena', 'condenação', 'homologo'],
        secundariasExatas: ['condenado', 'condenada', 'condenados', 'condenadas', 
                            'novo', 'nova', 'arbitra', 'rearbitra', 'arbitrado'],
        secundariasPrefixos: ['atribui', 'diminui', 'retifica', 'fixa', 'fixo', 
                              'debit', 'homolog', 'atualiz', 'execu']
      }
      
      // ============================================
      // UTILITÁRIOS
      // ============================================
      const normalizarValor = (valorStr) => {
        return parseFloat(valorStr.replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.'))
      }
      
      const extrairContexto = (texto, posicao, tamanhoMatch) => {
        const inicio = Math.max(0, posicao - CONFIG.TAMANHO_CONTEXTO)
        const fim = Math.min(texto.length, posicao + tamanhoMatch + CONFIG.TAMANHO_CONTEXTO)
        return texto.substring(inicio, fim)
      }
      
      // ============================================
      // VERIFICAÇÃO DE HONORÁRIOS
      // ============================================
      const verificarHonorarios = (contexto, posicaoValorNoContexto, tamanhoValor) => {
        const regexHonorarios = /\bhonor[áa]rio\w*\b/gi
        regexHonorarios.lastIndex = 0
        let matchHonorarios
        
        while ((matchHonorarios = regexHonorarios.exec(contexto)) !== null) {
          const posHonorarios = matchHonorarios.index
          const fimHonorarios = posHonorarios + matchHonorarios[0].length
          
          // Se "honorarios" está antes do valor
          if (fimHonorarios < posicaoValorNoContexto) {
            const textoEntre = contexto.substring(fimHonorarios, posicaoValorNoContexto)
            const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
            if (palavrasEntre.length < CONFIG.DISTANCIA_HONORARIOS) {
              return true
            }
          }
          // Se "honorarios" está depois do valor
          else if (posHonorarios > posicaoValorNoContexto + tamanhoValor) {
            const textoEntre = contexto.substring(posicaoValorNoContexto + tamanhoValor, posHonorarios)
            const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
            if (palavrasEntre.length < CONFIG.DISTANCIA_HONORARIOS) {
              return true
            }
          }
          // Se "honorarios" está sobreposto ou muito próximo
          else {
            return true
          }
        }
        
        return false
      }
      
      // ============================================
      // CÁLCULO DE PONTUAÇÃO
      // ============================================
      const calcularPontuacao = (contexto) => {
        const textoLower = contexto.toLowerCase()
        let pontos = 0
        let ehPrioritario = false
        const palavrasEncontradas = new Set()
        const temPalavrasPrioritarias = PALAVRAS.prioritariasExatas.some(p => 
          new RegExp(`\\b${p}\\b`, 'i').test(textoLower)
        )
        
        // Palavras prioritárias exatas
        PALAVRAS.prioritariasExatas.forEach(palavra => {
          const regex = new RegExp(`\\b${palavra}\\b`, 'gi')
          if (regex.test(textoLower)) {
            pontos++
            ehPrioritario = true
            palavrasEncontradas.add(palavra)
          }
        })
        
        // Palavras secundárias exatas
        PALAVRAS.secundariasExatas.forEach(palavra => {
          const regex = new RegExp(`\\b${palavra}\\b`, 'gi')
          if (regex.test(textoLower)) {
            pontos++
            palavrasEncontradas.add(palavra)
          }
        })
        
        // Palavras secundárias com prefixos
        PALAVRAS.secundariasPrefixos.forEach(prefixo => {
          const regex = new RegExp(`\\b${prefixo}\\w*`, 'gi')
          const matches = textoLower.match(regex)
          if (matches) {
            const palavrasUnicas = [...new Set(matches)]
            
            // Regra especial: atualiz* vira prioritário se tem palavras prioritárias
            if (prefixo === 'atualiz' && temPalavrasPrioritarias) {
              ehPrioritario = true
            }
            
            pontos += palavrasUnicas.length
            palavrasUnicas.forEach(p => palavrasEncontradas.add(p))
          }
        })
        
        return { pontos, ehPrioritario, palavras: Array.from(palavrasEncontradas) }
      }
      
      // ============================================
      // VERIFICAÇÃO DE CONDENAÇÃO PRÓXIMA
      // ============================================
      const verificarCondenacaoProxima = (contexto, posicaoValor) => {
        const textoAntes = contexto.substring(
          Math.max(0, posicaoValor - CONFIG.DISTANCIA_CONDENACAO), 
          posicaoValor
        )
        return textoAntes.toLowerCase().includes('condenação')
      }
      
      // ============================================
      // PROCESSAMENTO DE PÁGINAS
      // ============================================
      const processarPaginas = async (paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas) => {
        const regexValor = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
        let valoresEncontrados = 0
        
        for (let pag = paginaInicio; pag <= paginaFim; pag++) {
          if (paginasProcessadas.has(pag)) continue
          
          paginasProcessadas.add(pag)
          const page = await pdf.getPage(pag)
          const textContent = await page.getTextContent()
          const textoPagina = textContent.items.map(item => item.str).join(' ')
          
          regexValor.lastIndex = 0
          let match
          
          while ((match = regexValor.exec(textoPagina)) !== null) {
            const valorStr = match[0]
            const valorNum = normalizarValor(valorStr)
            
            if (isNaN(valorNum) || !isFinite(valorNum) || valorNum < limiteMin || valorNum > CONFIG.LIMITE_MAX) continue
            
            const contexto = extrairContexto(textoPagina, match.index, match[0].length)
            if (!contexto.includes(valorStr)) continue
            
            const posicaoValorNoContexto = contexto.indexOf(valorStr)
            if (verificarHonorarios(contexto, posicaoValorNoContexto, match[0].length)) continue
            
            const pontuacao = calcularPontuacao(contexto)
            if (pontuacao.pontos === 0) continue
            
            const condenacaoProxima = verificarCondenacaoProxima(contexto, posicaoValorNoContexto)
            const chave = Math.round(valorNum)
            
            if (!valoresMap.has(chave)) {
              valoresMap.set(chave, {
                valor: valorNum,
                valorFormatado: formatarMoeda(valorNum),
                valorNumerico: valorNum,
                paginas: [pag],
                contexto: contexto.trim(),
                paginaContexto: pag,
                pontos: pontuacao.pontos,
                palavrasEncontradas: pontuacao.palavras,
                ehPrioritario: pontuacao.ehPrioritario,
                condenacaoProxima: condenacaoProxima
              })
              valoresEncontrados++
            } else {
              const valorExistente = valoresMap.get(chave)
              if (!valorExistente.paginas.includes(pag)) {
                valorExistente.paginas.push(pag)
              }
              
              const melhor = (
                (condenacaoProxima && !valorExistente.condenacaoProxima) ||
                (condenacaoProxima === valorExistente.condenacaoProxima && 
                 pontuacao.pontos > valorExistente.pontos)
              )
              
              if (melhor) {
                valorExistente.contexto = contexto.trim()
                valorExistente.pontos = pontuacao.pontos
                valorExistente.palavrasEncontradas = pontuacao.palavras
                valorExistente.ehPrioritario = pontuacao.ehPrioritario
                valorExistente.condenacaoProxima = condenacaoProxima
                valorExistente.paginaContexto = pag
              }
            }
          }
          
          if (pag % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 10))
          }
        }
        
        return valoresEncontrados
      }
      
      // ============================================
      // ORDENAÇÃO COMPLETA
      // ============================================
      const ordenarValores = (valores) => {
        return valores.sort((a, b) => {
          // NÍVEL 1: Prioritários vs Não-prioritários
          if (a.ehPrioritario !== b.ehPrioritario) {
            return b.ehPrioritario ? 1 : -1
          }
          
          // DENTRO DO GRUPO PRIORITÁRIO
          if (a.ehPrioritario && b.ehPrioritario) {
            // 1. Valores com 4+ pontos e prioritários
            const a4Plus = a.pontos >= 4
            const b4Plus = b.pontos >= 4
            if (a4Plus !== b4Plus) {
              return b4Plus ? 1 : -1
            }
            
            // 2. Condenação próxima
            if (a.condenacaoProxima !== b.condenacaoProxima) {
              return b.condenacaoProxima ? 1 : -1
            }
            
            // 3. Por pontos
            if (a.pontos !== b.pontos) {
              return b.pontos - a.pontos
            }
            
            // 4. Priorizar "homologo" sobre "condena"
            const aTemHomologo = a.palavrasEncontradas.includes('homologo')
            const bTemHomologo = b.palavrasEncontradas.includes('homologo')
            if (aTemHomologo !== bTemHomologo) {
              return bTemHomologo ? 1 : -1
            }
            
            // 5. Valor maior
            return b.valorNumerico - a.valorNumerico
          }
          
          // DENTRO DO GRUPO NÃO-PRIORITÁRIO
          // 1. "novo" ou "nova"
          const aTemNovo = a.palavrasEncontradas.some(p => ['novo', 'nova'].includes(p))
          const bTemNovo = b.palavrasEncontradas.some(p => ['novo', 'nova'].includes(p))
          if (aTemNovo !== bTemNovo) {
            return bTemNovo ? 1 : -1
          }
          
          // 2. "arbitra", "rearbitra", "arbitrado"
          const aTemArbitra = a.palavrasEncontradas.some(p => 
            ['arbitra', 'rearbitra', 'arbitrado'].includes(p)
          )
          const bTemArbitra = b.palavrasEncontradas.some(p => 
            ['arbitra', 'rearbitra', 'arbitrado'].includes(p)
          )
          if (aTemArbitra !== bTemArbitra) {
            return bTemArbitra ? 1 : -1
          }
          
          // 3. "atualiz*"
          const aTemAtualiz = a.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          const bTemAtualiz = b.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          if (aTemAtualiz !== bTemAtualiz) {
            return bTemAtualiz ? 1 : -1
          }
          
          // 4. Por pontos
          if (a.pontos !== b.pontos) {
            return b.pontos - a.pontos
          }
          
          // 5. Valor maior
          return b.valorNumerico - a.valorNumerico
        })
      }
      
      // ============================================
      // MOTOR PRINCIPAL
      // ============================================
      let limiteMin = CONFIG.LIMITE_MIN_INICIAL
      let paginaInicio, paginaFim
      
      if (numPages < CONFIG.THRESHOLD_PAGINAS_GRANDE) {
        paginaInicio = 1
        paginaFim = numPages
        console.log(`[Motor 3] Documento pequeno: processando 100% (${numPages} páginas)`)
      } else {
        paginaInicio = Math.ceil(numPages * 0.5) + 1
        paginaFim = numPages
        console.log(`[Motor 3] Documento grande: iniciando com últimos 50% (páginas ${paginaInicio}-${paginaFim})`)
      }
      
      const valoresMap = new Map()
      const paginasProcessadas = new Set()
      
      // FASE 2: Busca progressiva
      await processarPaginas(paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas)
      
      if (valoresMap.size === 0) {
        console.log(`[Motor 3] Nenhum valor encontrado. Expandindo busca...`)
        const percentuais = [0.6, 0.7, 0.8, 0.9, 1.0]
        for (const perc of percentuais) {
          const novaPaginaInicio = Math.ceil(numPages * (1 - perc)) + 1
          if (novaPaginaInicio < paginaInicio) {
            console.log(`[Motor 3] Expandindo para ${Math.round(perc * 100)}% (páginas ${novaPaginaInicio}-${paginaInicio - 1})`)
            await processarPaginas(novaPaginaInicio, paginaInicio - 1, limiteMin, valoresMap, paginasProcessadas)
            paginaInicio = novaPaginaInicio
            if (valoresMap.size > 0) break
          }
        }
      }
      
      // FASE 3: Redução de limite (se necessário)
      if (valoresMap.size === 0) {
        console.log(`[Motor 3] Reduzindo limite para R$ ${CONFIG.LIMITE_MIN_ALTERNATIVO.toLocaleString('pt-BR')}`)
        limiteMin = CONFIG.LIMITE_MIN_ALTERNATIVO
        paginasProcessadas.clear()
        
        if (numPages < CONFIG.THRESHOLD_PAGINAS_GRANDE) {
          paginaInicio = 1
          paginaFim = numPages
        } else {
          paginaInicio = Math.ceil(numPages * 0.5) + 1
          paginaFim = numPages
        }
        
        await processarPaginas(paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas)
        
        if (valoresMap.size === 0) {
          const percentuais = [0.6, 0.7, 0.8, 0.9, 1.0]
          for (const perc of percentuais) {
            const novaPaginaInicio = Math.ceil(numPages * (1 - perc)) + 1
            if (novaPaginaInicio < paginaInicio) {
              await processarPaginas(novaPaginaInicio, paginaInicio - 1, limiteMin, valoresMap, paginasProcessadas)
              paginaInicio = novaPaginaInicio
              if (valoresMap.size > 0) break
            }
          }
        }
      }
      
      console.log(`[Motor 3] Total de valores únicos encontrados: ${valoresMap.size}`)
      
      // FASE 7: Ordenação
      let valoresArray = Array.from(valoresMap.values())
      valoresArray = ordenarValores(valoresArray)
      
      // FASE 8: Exibição
      const valoresAltos = valoresArray.filter(v => v.valor >= CONFIG.LIMITE_EXIBICAO)
      let resultadoFinal
      
      if (valoresAltos.length >= CONFIG.MAX_RESULTADOS) {
        resultadoFinal = valoresAltos.slice(0, CONFIG.MAX_RESULTADOS)
      } else if (valoresAltos.length > 0) {
        const faltam = CONFIG.MAX_RESULTADOS - valoresAltos.length
        const valoresBaixos = valoresArray.filter(v => v.valor < CONFIG.LIMITE_EXIBICAO).slice(0, faltam)
        resultadoFinal = [...valoresAltos, ...valoresBaixos]
      } else {
        resultadoFinal = valoresArray.slice(0, CONFIG.MAX_RESULTADOS)
      }
      
      // Garantir que todos os valores tenham a propriedade 'valor' (compatibilidade com código de exibição)
      resultadoFinal = resultadoFinal.map(v => ({
        ...v,
        valor: v.valorFormatado // Adicionar propriedade 'valor' para compatibilidade
      }))
      
      const valorMaisProvavel = resultadoFinal.length > 0 ? resultadoFinal[0] : null
      
      return {
        valorAReceber: valorMaisProvavel ? valorMaisProvavel.valorFormatado : null,
        pontos: valorMaisProvavel ? valorMaisProvavel.pontos : 0,
        palavrasEncontradas: valorMaisProvavel ? valorMaisProvavel.palavrasEncontradas : [],
        contexto: valorMaisProvavel ? valorMaisProvavel.contexto : null,
        paginas: valorMaisProvavel ? valorMaisProvavel.paginas : [],
        encontrado: valorMaisProvavel !== null,
        todosValores: resultadoFinal
      }
      
    } catch (error) {
      console.error('Erro ao processar PDF:', error)
      throw error
    }
  }

  // Modelo 4: Versão do Motor 3 com lógica de exibição atualizada (prioriza borda vermelha antes do filtro de R$ 15.000)
  const analisarPDFModelo4 = async (nomeArquivo) => {
    const url = `/Processos/${encodeURIComponent(nomeArquivo)}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.status}`)
      }
      
      const arrayBuffer = await response.arrayBuffer()
      const pdfData = new Uint8Array(arrayBuffer)
      const pdf = await pdfjsLib.getDocument({ 
        data: pdfData,
        verbosity: 0,
        stopAtErrors: false,
        useSystemFonts: true
      }).promise
      
      const numPages = pdf.numPages
      console.log(`[Motor 4] Total de páginas: ${numPages}`)
      
      // ============================================
      // CONFIGURAÇÕES E CONSTANTES
      // ============================================
      const CONFIG = {
        LIMITE_MIN_INICIAL: 1000,
        LIMITE_MIN_ALTERNATIVO: 500,
        LIMITE_MAX: 100000000,
        LIMITE_EXIBICAO: 15000,
        TAMANHO_CONTEXTO: 500,
        DISTANCIA_HONORARIOS: 3,
        DISTANCIA_CONDENACAO: 50,
        MAX_RESULTADOS: 4,
        THRESHOLD_PAGINAS_GRANDE: 100
      }
      
      const PALAVRAS = {
        prioritariasExatas: ['condena', 'condenação', 'homologo'],
        secundariasExatas: ['condenado', 'condenada', 'condenados', 'condenadas', 
                            'novo', 'nova', 'arbitra', 'rearbitra', 'arbitrado'],
        secundariasPrefixos: ['atribui', 'diminui', 'retifica', 'fixa', 'fixo', 
                              'debit', 'homolog', 'atualiz', 'execu']
      }
      
      // ============================================
      // UTILITÁRIOS
      // ============================================
      const normalizarValor = (valorStr) => {
        return parseFloat(valorStr.replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.'))
      }
      
      const extrairContexto = (texto, posicao, tamanhoMatch) => {
        const inicio = Math.max(0, posicao - CONFIG.TAMANHO_CONTEXTO)
        const fim = Math.min(texto.length, posicao + tamanhoMatch + CONFIG.TAMANHO_CONTEXTO)
        return texto.substring(inicio, fim)
      }
      
      // ============================================
      // VERIFICAÇÃO DE HONORÁRIOS
      // ============================================
      const verificarHonorarios = (contexto, posicaoValorNoContexto, tamanhoValor) => {
        const regexHonorarios = /\bhonor[áa]rio\w*\b/gi
        regexHonorarios.lastIndex = 0
        let matchHonorarios
        
        while ((matchHonorarios = regexHonorarios.exec(contexto)) !== null) {
          const posHonorarios = matchHonorarios.index
          const fimHonorarios = posHonorarios + matchHonorarios[0].length
          
          // Se "honorarios" está antes do valor
          if (fimHonorarios < posicaoValorNoContexto) {
            const textoEntre = contexto.substring(fimHonorarios, posicaoValorNoContexto)
            const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
            if (palavrasEntre.length < CONFIG.DISTANCIA_HONORARIOS) {
              return true
            }
          }
          // Se "honorarios" está depois do valor
          else if (posHonorarios > posicaoValorNoContexto + tamanhoValor) {
            const textoEntre = contexto.substring(posicaoValorNoContexto + tamanhoValor, posHonorarios)
            const palavrasEntre = textoEntre.match(/\b\w+\b/g) || []
            if (palavrasEntre.length < CONFIG.DISTANCIA_HONORARIOS) {
              return true
            }
          }
          // Se "honorarios" está sobreposto ou muito próximo
          else {
            return true
          }
        }
        
        return false
      }
      
      // ============================================
      // CÁLCULO DE PONTUAÇÃO
      // ============================================
      const calcularPontuacao = (contexto) => {
        const textoLower = contexto.toLowerCase()
        let pontos = 0
        let ehPrioritario = false
        const palavrasEncontradas = new Set()
        const temPalavrasPrioritarias = PALAVRAS.prioritariasExatas.some(p => 
          new RegExp(`\\b${p}\\b`, 'i').test(textoLower)
        )
        
        // Palavras prioritárias exatas
        PALAVRAS.prioritariasExatas.forEach(palavra => {
          const regex = new RegExp(`\\b${palavra}\\b`, 'gi')
          if (regex.test(textoLower)) {
            pontos++
            ehPrioritario = true
            palavrasEncontradas.add(palavra)
          }
        })
        
        // Palavras secundárias exatas
        PALAVRAS.secundariasExatas.forEach(palavra => {
          const regex = new RegExp(`\\b${palavra}\\b`, 'gi')
          if (regex.test(textoLower)) {
            pontos++
            palavrasEncontradas.add(palavra)
          }
        })
        
        // Palavras secundárias com prefixos
        PALAVRAS.secundariasPrefixos.forEach(prefixo => {
          const regex = new RegExp(`\\b${prefixo}\\w*`, 'gi')
          const matches = textoLower.match(regex)
          if (matches) {
            const palavrasUnicas = [...new Set(matches)]
            
            // Regra especial: atualiz* vira prioritário se tem palavras prioritárias
            if (prefixo === 'atualiz' && temPalavrasPrioritarias) {
              ehPrioritario = true
            }
            
            pontos += palavrasUnicas.length
            palavrasUnicas.forEach(p => palavrasEncontradas.add(p))
          }
        })
        
        return { pontos, ehPrioritario, palavras: Array.from(palavrasEncontradas) }
      }
      
      // ============================================
      // VERIFICAÇÃO DE CONDENAÇÃO PRÓXIMA
      // ============================================
      const verificarCondenacaoProxima = (contexto, posicaoValor) => {
        const textoAntes = contexto.substring(
          Math.max(0, posicaoValor - CONFIG.DISTANCIA_CONDENACAO), 
          posicaoValor
        )
        return textoAntes.toLowerCase().includes('condenação')
      }
      
      // ============================================
      // PROCESSAMENTO DE PÁGINAS
      // ============================================
      const processarPaginas = async (paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas) => {
        const regexValor = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
        let valoresEncontrados = 0
        
        for (let pag = paginaInicio; pag <= paginaFim; pag++) {
          if (paginasProcessadas.has(pag)) continue
          
          paginasProcessadas.add(pag)
          const page = await pdf.getPage(pag)
          const textContent = await page.getTextContent()
          const textoPagina = textContent.items.map(item => item.str).join(' ')
          
          regexValor.lastIndex = 0
          let match
          
          while ((match = regexValor.exec(textoPagina)) !== null) {
            const valorStr = match[0]
            const valorNum = normalizarValor(valorStr)
            
            if (isNaN(valorNum) || !isFinite(valorNum) || valorNum < limiteMin || valorNum > CONFIG.LIMITE_MAX) continue
            
            const contexto = extrairContexto(textoPagina, match.index, match[0].length)
            if (!contexto.includes(valorStr)) continue
            
            const posicaoValorNoContexto = contexto.indexOf(valorStr)
            if (verificarHonorarios(contexto, posicaoValorNoContexto, match[0].length)) continue
            
            const pontuacao = calcularPontuacao(contexto)
            if (pontuacao.pontos === 0) continue
            
            const condenacaoProxima = verificarCondenacaoProxima(contexto, posicaoValorNoContexto)
            const chave = Math.round(valorNum)
            
            if (!valoresMap.has(chave)) {
              valoresMap.set(chave, {
                valor: valorNum,
                valorFormatado: formatarMoeda(valorNum),
                valorNumerico: valorNum,
                paginas: [pag],
                contexto: contexto.trim(),
                paginaContexto: pag,
                pontos: pontuacao.pontos,
                palavrasEncontradas: pontuacao.palavras,
                ehPrioritario: pontuacao.ehPrioritario,
                condenacaoProxima: condenacaoProxima
              })
              valoresEncontrados++
            } else {
              const valorExistente = valoresMap.get(chave)
              if (!valorExistente.paginas.includes(pag)) {
                valorExistente.paginas.push(pag)
              }
              
              const melhor = (
                (condenacaoProxima && !valorExistente.condenacaoProxima) ||
                (condenacaoProxima === valorExistente.condenacaoProxima && 
                 pontuacao.pontos > valorExistente.pontos)
              )
              
              if (melhor) {
                valorExistente.contexto = contexto.trim()
                valorExistente.pontos = pontuacao.pontos
                valorExistente.palavrasEncontradas = pontuacao.palavras
                valorExistente.ehPrioritario = pontuacao.ehPrioritario
                valorExistente.condenacaoProxima = condenacaoProxima
                valorExistente.paginaContexto = pag
              }
            }
          }
          
          if (pag % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 10))
          }
        }
        
        return valoresEncontrados
      }
      
      // ============================================
      // ORDENAÇÃO COMPLETA
      // ============================================
      const ordenarValores = (valores) => {
        return valores.sort((a, b) => {
          // NÍVEL 1: Prioritários vs Não-prioritários
          if (a.ehPrioritario !== b.ehPrioritario) {
            return b.ehPrioritario ? 1 : -1
          }
          
          // DENTRO DO GRUPO PRIORITÁRIO
          if (a.ehPrioritario && b.ehPrioritario) {
            // 1. Valores com 4+ pontos e prioritários
            const a4Plus = a.pontos >= 4
            const b4Plus = b.pontos >= 4
            if (a4Plus !== b4Plus) {
              return b4Plus ? 1 : -1
            }
            
            // 2. Condenação próxima
            if (a.condenacaoProxima !== b.condenacaoProxima) {
              return b.condenacaoProxima ? 1 : -1
            }
            
            // 3. Por pontos
            if (a.pontos !== b.pontos) {
              return b.pontos - a.pontos
            }
            
            // 4. Priorizar "homologo" sobre "condena"
            const aTemHomologo = a.palavrasEncontradas.includes('homologo')
            const bTemHomologo = b.palavrasEncontradas.includes('homologo')
            if (aTemHomologo !== bTemHomologo) {
              return bTemHomologo ? 1 : -1
            }
            
            // 5. Valor maior
            return b.valorNumerico - a.valorNumerico
          }
          
          // DENTRO DO GRUPO NÃO-PRIORITÁRIO
          // 1. "novo" ou "nova"
          const aTemNovo = a.palavrasEncontradas.some(p => ['novo', 'nova'].includes(p))
          const bTemNovo = b.palavrasEncontradas.some(p => ['novo', 'nova'].includes(p))
          if (aTemNovo !== bTemNovo) {
            return bTemNovo ? 1 : -1
          }
          
          // 2. "arbitra", "rearbitra", "arbitrado"
          const aTemArbitra = a.palavrasEncontradas.some(p => 
            ['arbitra', 'rearbitra', 'arbitrado'].includes(p)
          )
          const bTemArbitra = b.palavrasEncontradas.some(p => 
            ['arbitra', 'rearbitra', 'arbitrado'].includes(p)
          )
          if (aTemArbitra !== bTemArbitra) {
            return bTemArbitra ? 1 : -1
          }
          
          // 3. "atualiz*"
          const aTemAtualiz = a.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          const bTemAtualiz = b.palavrasEncontradas.some(p => p.startsWith('atualiz'))
          if (aTemAtualiz !== bTemAtualiz) {
            return bTemAtualiz ? 1 : -1
          }
          
          // 4. Por pontos
          if (a.pontos !== b.pontos) {
            return b.pontos - a.pontos
          }
          
          // 5. Valor maior
          return b.valorNumerico - a.valorNumerico
        })
      }
      
      // ============================================
      // MOTOR PRINCIPAL
      // ============================================
      let limiteMin = CONFIG.LIMITE_MIN_INICIAL
      let paginaInicio, paginaFim
      
      if (numPages < CONFIG.THRESHOLD_PAGINAS_GRANDE) {
        paginaInicio = 1
        paginaFim = numPages
        console.log(`[Motor 4] Documento pequeno: processando 100% (${numPages} páginas)`)
      } else {
        paginaInicio = Math.ceil(numPages * 0.5) + 1
        paginaFim = numPages
        console.log(`[Motor 4] Documento grande: iniciando com últimos 50% (páginas ${paginaInicio}-${paginaFim})`)
      }
      
      const valoresMap = new Map()
      const paginasProcessadas = new Set()
      
      // FASE 2: Busca progressiva
      await processarPaginas(paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas)
      
      if (valoresMap.size === 0) {
        console.log(`[Motor 4] Nenhum valor encontrado. Expandindo busca...`)
        const percentuais = [0.6, 0.7, 0.8, 0.9, 1.0]
        for (const perc of percentuais) {
          const novaPaginaInicio = Math.ceil(numPages * (1 - perc)) + 1
          if (novaPaginaInicio < paginaInicio) {
            console.log(`[Motor 4] Expandindo para ${Math.round(perc * 100)}% (páginas ${novaPaginaInicio}-${paginaInicio - 1})`)
            await processarPaginas(novaPaginaInicio, paginaInicio - 1, limiteMin, valoresMap, paginasProcessadas)
            paginaInicio = novaPaginaInicio
            if (valoresMap.size > 0) break
          }
        }
      }
      
      // FASE 3: Redução de limite (se necessário)
      if (valoresMap.size === 0) {
        console.log(`[Motor 4] Reduzindo limite para R$ ${CONFIG.LIMITE_MIN_ALTERNATIVO.toLocaleString('pt-BR')}`)
        limiteMin = CONFIG.LIMITE_MIN_ALTERNATIVO
        paginasProcessadas.clear()
        
        if (numPages < CONFIG.THRESHOLD_PAGINAS_GRANDE) {
          paginaInicio = 1
          paginaFim = numPages
        } else {
          paginaInicio = Math.ceil(numPages * 0.5) + 1
          paginaFim = numPages
        }
        
        await processarPaginas(paginaInicio, paginaFim, limiteMin, valoresMap, paginasProcessadas)
        
        if (valoresMap.size === 0) {
          const percentuais = [0.6, 0.7, 0.8, 0.9, 1.0]
          for (const perc of percentuais) {
            const novaPaginaInicio = Math.ceil(numPages * (1 - perc)) + 1
            if (novaPaginaInicio < paginaInicio) {
              await processarPaginas(novaPaginaInicio, paginaInicio - 1, limiteMin, valoresMap, paginasProcessadas)
              paginaInicio = novaPaginaInicio
              if (valoresMap.size > 0) break
            }
          }
        }
      }
      
      console.log(`[Motor 4] Total de valores únicos encontrados: ${valoresMap.size}`)
      
      // FASE 7: Ordenação
      let valoresArray = Array.from(valoresMap.values())
      valoresArray = ordenarValores(valoresArray)
      
      // Motor 4: Retornar TODOS os valores ordenados (a lógica de exibição será diferente)
      // Garantir que todos os valores tenham a propriedade 'valor' (compatibilidade com código de exibição)
      const todosValoresFormatados = valoresArray.map(v => ({
        ...v,
        valor: v.valorFormatado // Adicionar propriedade 'valor' para compatibilidade
      }))
      
      const valorMaisProvavel = todosValoresFormatados.length > 0 ? todosValoresFormatados[0] : null
      
      return {
        valorAReceber: valorMaisProvavel ? valorMaisProvavel.valorFormatado : null,
        pontos: valorMaisProvavel ? valorMaisProvavel.pontos : 0,
        palavrasEncontradas: valorMaisProvavel ? valorMaisProvavel.palavrasEncontradas : [],
        contexto: valorMaisProvavel ? valorMaisProvavel.contexto : null,
        paginas: valorMaisProvavel ? valorMaisProvavel.paginas : [],
        encontrado: valorMaisProvavel !== null,
        todosValores: todosValoresFormatados // Retornar todos os valores ordenados
      }
      
    } catch (error) {
      console.error('Erro ao processar PDF:', error)
      throw error
    }
  }

  const selecionarProcesso = async (processo) => {
    setProcessoSelecionado(processo)
    setLoading(true)
    setErro(null)
    setResultado(null)

    try {
      const resultadoAnalise = modeloAtivo === 1 
        ? await analisarPDF(processo.arquivo)
        : modeloAtivo === 2
        ? await analisarPDFModelo2(processo.arquivo)
        : modeloAtivo === 3
        ? await analisarPDFModelo3(processo.arquivo)
        : await analisarPDFModelo4(processo.arquivo)
      setResultado(resultadoAnalise)
      // Salvar no resumo
      setResultadosResumo(prev => {
        const novo = new Map(prev)
        novo.set(processo.nome, {
          ...resultadoAnalise,
          arquivo: processo.arquivo,
          dataAnalise: new Date().toLocaleString('pt-BR'),
          modelo: modeloAtivo
        })
        return novo
      })
    } catch (error) {
      console.error('Erro ao processar:', error)
      setErro(`Erro ao processar o PDF: ${error.message || 'Erro desconhecido'}`)
    } finally {
      setLoading(false)
    }
  }

  // Função para recalcular o processo atual quando o modelo mudar
  const recalcularProcessoAtual = async () => {
    if (!processoSelecionado) return
    
    setLoading(true)
    setErro(null)
    setResultado(null)

    try {
      const resultadoAnalise = modeloAtivo === 1 
        ? await analisarPDF(processoSelecionado.arquivo)
        : modeloAtivo === 2
        ? await analisarPDFModelo2(processoSelecionado.arquivo)
        : modeloAtivo === 3
        ? await analisarPDFModelo3(processoSelecionado.arquivo)
        : await analisarPDFModelo4(processoSelecionado.arquivo)
      setResultado(resultadoAnalise)
      // Atualizar no resumo
      setResultadosResumo(prev => {
        const novo = new Map(prev)
        novo.set(processoSelecionado.nome, {
          ...resultadoAnalise,
          arquivo: processoSelecionado.arquivo,
          dataAnalise: new Date().toLocaleString('pt-BR'),
          modelo: modeloAtivo
        })
        return novo
      })
    } catch (error) {
      console.error('Erro ao processar:', error)
      setErro(`Erro ao processar o PDF: ${error.message || 'Erro desconhecido'}`)
    } finally {
      setLoading(false)
    }
  }

  // Recalcular automaticamente quando o modelo mudar e houver processo selecionado
  useEffect(() => {
    if (processoSelecionado) {
      recalcularProcessoAtual()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeloAtivo])

  return (
    <div className="app-container">
      <div className="container">
        {/* Header com Seletor de Modelo */}
        <div className="header-modelo-novo">
          <div className="header-left-preto">
            <h1 className="header-title-preto">Consulta de Precatórios</h1>
          </div>
          <div className="header-right-cinza">
            <h2 className="header-escolha">Escolha o motor de busca</h2>
            <div className="motores-busca">
              <div className="motor-item">
                <button 
                  className={`btn-motor ${modeloAtivo === 1 ? 'ativo' : ''}`}
                  onClick={() => setModeloAtivo(1)}
                >
                  Motor de busca 1
                </button>
                <button 
                  className="btn-ver-regras-item"
                  onClick={() => {
                    setModeloRegras(1)
                    setMostrarArvoreRegras(true)
                  }}
                >
                  Ver regras
                </button>
              </div>
              <div className="motor-item">
                <button 
                  className={`btn-motor ${modeloAtivo === 2 ? 'ativo' : ''}`}
                  onClick={() => setModeloAtivo(2)}
                >
                  Motor de busca 2
                </button>
                <button 
                  className="btn-ver-regras-item"
                  onClick={() => {
                    setModeloRegras(2)
                    setMostrarArvoreRegras(true)
                  }}
                >
                  Ver regras
                </button>
              </div>
              <div className="motor-item">
                <button 
                  className={`btn-motor ${modeloAtivo === 3 ? 'ativo' : ''}`}
                  onClick={() => setModeloAtivo(3)}
                >
                  Motor de busca 3
                </button>
                <button 
                  className="btn-ver-regras-item"
                  onClick={() => {
                    setModeloRegras(3)
                    setMostrarArvoreRegras(true)
                  }}
                >
                  Ver regras
                </button>
              </div>
              {/* Motor 4 oculto temporariamente */}
              {/* <div className="motor-item">
                <button 
                  className={`btn-motor ${modeloAtivo === 4 ? 'ativo' : ''}`}
                  onClick={() => setModeloAtivo(4)}
                >
                  Motor de busca 4
                </button>
                <button 
                  className="btn-ver-regras-item"
                  onClick={() => {
                    setModeloRegras(4)
                    setMostrarArvoreRegras(true)
                  }}
                >
                  Ver regras
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {!processoSelecionado && (
          <p className="subtitle">Selecione um processo para analisar</p>
        )}
        
        {/* Layout de duas colunas quando há processo selecionado ou resumo ativo */}
        <div className={processoSelecionado || abaAtiva === 'resumo' ? "layout-duas-colunas" : ""}>
          {/* Coluna esquerda: Lista de processos */}
          <div className="coluna-esquerda">
            {/* Campo de busca */}
            <div className="campo-busca-processo">
              <input
                type="text"
                placeholder="Buscar por número de processo..."
                value={buscaProcesso}
                onChange={(e) => setBuscaProcesso(e.target.value)}
                className="input-busca-processo"
              />
            </div>

            {!processoSelecionado ? (
              <div className="lista-selecao">
                {listaProcessos
                  .filter(processo => {
                    if (buscaProcesso === '') return true
                    const buscaLower = buscaProcesso.toLowerCase()
                    const nomeLimpo = extrairNomeLimpo(processo.nome, processo.arquivo).toLowerCase()
                    return nomeLimpo.includes(buscaLower) ||
                           processo.nome.toLowerCase().includes(buscaLower) ||
                           processo.arquivo.toLowerCase().includes(buscaLower)
                  })
                  .map((processo, index) => (
                    <button
                      key={index}
                      onClick={() => selecionarProcesso(processo)}
                      className="btn-processo"
                    >
                      {extrairNomeLimpo(processo.nome, processo.arquivo)}
                    </button>
                  ))}
              </div>
            ) : (
              <div className="lista-selecao">
                <h3 className="titulo-lista">Processos</h3>
                {listaProcessos
                  .filter(processo => {
                    if (buscaProcesso === '') return true
                    const buscaLower = buscaProcesso.toLowerCase()
                    const nomeLimpo = extrairNomeLimpo(processo.nome, processo.arquivo).toLowerCase()
                    return nomeLimpo.includes(buscaLower) ||
                           processo.nome.toLowerCase().includes(buscaLower) ||
                           processo.arquivo.toLowerCase().includes(buscaLower)
                  })
                  .map((processo, index) => (
                    <button
                      key={index}
                      onClick={() => selecionarProcesso(processo)}
                      className={`btn-processo ${processoSelecionado.nome === processo.nome ? 'ativo' : ''}`}
                    >
                      {extrairNomeLimpo(processo.nome, processo.arquivo)}
                    </button>
                  ))}
              </div>
            )}
          </div>
          
          {/* Coluna direita: Resultado ou Resumo */}
          {(processoSelecionado || abaAtiva === 'resumo') && (
            <div className="coluna-direita">
              {/* Abas */}
              <div className="abas-container">
                <button 
                  className={`aba ${abaAtiva === 'analise' ? 'ativa' : ''}`}
                  onClick={() => {
                    setAbaAtiva('analise')
                    if (!processoSelecionado && listaProcessos.length > 0) {
                      selecionarProcesso(listaProcessos[0])
                    }
                  }}
                  disabled={!processoSelecionado && abaAtiva === 'resumo'}
                >
                  Análise
                </button>
                <button 
                  className={`aba ${abaAtiva === 'resumo' ? 'ativa' : ''}`}
                  onClick={() => setAbaAtiva('resumo')}
                >
                  Resumo ({resultadosResumo.size})
                </button>
              </div>

              {abaAtiva === 'analise' && processoSelecionado && (
                <>
                  {loading && (
                    <div className="loading-indicator">
                      <p><strong>Analisando processo...</strong></p>
                      <p>Identificando o valor a receber...</p>
                    </div>
                  )}

                  {erro && (
                    <div className="erro">
                      <p>{erro}</p>
                    </div>
                  )}

                  {resultado && (
                    <div className="resultado">
                      <div className="resultado-header-sticky">
                        <h2>Processo: {processoSelecionado.nome}</h2>
                      </div>
            
            {resultado.todosValores && resultado.todosValores.length > 0 ? (
              <>
                {resultado.todosValores.filter(v => {
                  const temCondena = v.palavrasEncontradas && (v.palavrasEncontradas.includes('condena') || v.palavrasEncontradas.includes('condenação'))
                  const temHomologo = v.palavrasEncontradas && v.palavrasEncontradas.includes('homologo')
                  return temCondena || temHomologo || v.ehPrioritario
                }).length > 1 && (
                  <div className="label-multiplos-potenciais">
                    <strong>⚠️ Múltiplos Valores Potenciais:</strong> Este processo possui {resultado.todosValores.filter(v => {
                      const temCondena = v.palavrasEncontradas && (v.palavrasEncontradas.includes('condena') || v.palavrasEncontradas.includes('condenação'))
                      const temHomologo = v.palavrasEncontradas && v.palavrasEncontradas.includes('homologo')
                      return temCondena || temHomologo || v.ehPrioritario
                    }).length} valores com prioridade (marcados com borda vermelha). Verifique todos eles abaixo.
                  </div>
                )}
              </>
            ) : (
              <div className="sem-valor">
                <p>
                  {modeloAtivo === 1 
                    ? "Nenhum valor encontrado no documento (valores >= R$ 15.000)."
                    : "Nenhum valor encontrado no documento (valores >= R$ 1.000 ou R$ 500 após redução do limite)."
                  }
                </p>
              </div>
            )}
            
            {resultado.todosValores && resultado.todosValores.length > 0 && (
              <div className="valores-card">
                    <div className="lista-valores-card">
                      {(() => {
                        // Motor 4: Prioriza borda vermelha antes do filtro de R$ 15.000
                        if (modeloAtivo === 4) {
                          // Separar valores com borda vermelha (prioritários)
                          const valoresComBordaVermelha = resultado.todosValores.filter(item => {
                            const temCondena = item.palavrasEncontradas && (item.palavrasEncontradas.includes('condena') || item.palavrasEncontradas.includes('condenação'))
                            const temHomologo = item.palavrasEncontradas && item.palavrasEncontradas.includes('homologo')
                            return temCondena || temHomologo || item.ehPrioritario
                          })
                          
                          const valoresSemBordaVermelha = resultado.todosValores.filter(item => {
                            const temCondena = item.palavrasEncontradas && (item.palavrasEncontradas.includes('condena') || item.palavrasEncontradas.includes('condenação'))
                            const temHomologo = item.palavrasEncontradas && item.palavrasEncontradas.includes('homologo')
                            return !(temCondena || temHomologo || item.ehPrioritario)
                          })
                          
                          // Dentro do grupo com borda vermelha: filtrar valores >= R$ 15.000
                          const valoresBordaVermelhaAcima15k = valoresComBordaVermelha.filter(item => {
                            const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                            return valorNumerico >= 15000
                          })
                          
                          const valoresBordaVermelhaAbaixo15k = valoresComBordaVermelha.filter(item => {
                            const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                            return valorNumerico < 15000
                          })
                          
                          // Dentro do grupo sem borda vermelha: filtrar valores >= R$ 15.000
                          const valoresSemBordaAcima15k = valoresSemBordaVermelha.filter(item => {
                            const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                            return valorNumerico >= 15000
                          })
                          
                          const valoresSemBordaAbaixo15k = valoresSemBordaVermelha.filter(item => {
                            const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                            return valorNumerico < 15000
                          })
                          
                          // Montar lista final: Bordas vermelhas primeiro (acima de 15k, depois abaixo), depois sem borda (acima de 15k, depois abaixo)
                          let valoresParaMostrar = []
                          
                          // 1. Bordas vermelhas >= R$ 15.000
                          valoresParaMostrar = [...valoresParaMostrar, ...valoresBordaVermelhaAcima15k]
                          
                          // 2. Bordas vermelhas < R$ 15.000
                          valoresParaMostrar = [...valoresParaMostrar, ...valoresBordaVermelhaAbaixo15k]
                          
                          // 3. Sem borda >= R$ 15.000
                          valoresParaMostrar = [...valoresParaMostrar, ...valoresSemBordaAcima15k]
                          
                          // 4. Sem borda < R$ 15.000
                          valoresParaMostrar = [...valoresParaMostrar, ...valoresSemBordaAbaixo15k]
                          
                          // Aplicar limite de 4
                          const valoresFinais = valoresParaMostrar.slice(0, 4)
                          
                          return valoresFinais.map((item, idx) => {
                            // ... resto do código de renderização igual ...
                            const temCondena = item.palavrasEncontradas && (item.palavrasEncontradas.includes('condena') || item.palavrasEncontradas.includes('condenação'))
                            const temHomologo = item.palavrasEncontradas && item.palavrasEncontradas.includes('homologo')
                            const temPrioridade = temCondena || temHomologo || item.ehPrioritario
                            return (
                            <div key={idx} className={`item-valor-card ${temPrioridade ? 'tem-prioridade' : ''}`}>
                              <div className="valor-header-card">
                                <span className="posicao-badge">#{idx + 1}</span>
                                <span className="valor-numero-card">{item.valor}</span>
                                <span className="pontuacao-badge">{item.pontos} {item.pontos === 1 ? 'ponto' : 'pontos'}</span>
                              </div>
                        {item.palavrasEncontradas && item.palavrasEncontradas.length > 0 && (
                          <div className="palavras-encontradas">
                            <strong>Palavras que pontuaram:</strong>
                            <div className="tags-palavras">
                              {item.palavrasEncontradas.map((palavra, pIdx) => (
                                <span key={pIdx} className="tag-palavra">{palavra}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {item.contexto && (() => {
                          const contextoCompleto = item.contexto
                          const REGEX_VALOR = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
                          
                          // Extrair o valor numérico do item.valor (ex: "R$ 50.000,00" -> 50000.00)
                          const parseValorFormatado = (str) => {
                            const limpo = str.replace(/[^\d,]/g, '').replace(',', '.')
                            return parseFloat(limpo)
                          }
                          
                          const valorNumericoItem = parseValorFormatado(item.valor)
                          
                          // Tentar encontrar o valor exato no contexto
                          let valorEncontrado = null
                          let posicaoValor = -1
                          let match
                          REGEX_VALOR.lastIndex = 0
                          
                          while ((match = REGEX_VALOR.exec(contextoCompleto)) !== null) {
                            const valorNum = parseValorFormatado(match[0])
                            if (Math.abs(valorNum - valorNumericoItem) < 0.01) {
                              valorEncontrado = match[0]
                              posicaoValor = match.index
                              break
                            }
                          }
                          
                          if (valorEncontrado && posicaoValor >= 0) {
                            // Extrair contexto centrado no valor (200 chars antes e depois)
                            const inicio = Math.max(0, posicaoValor - 200)
                            const fim = Math.min(contextoCompleto.length, posicaoValor + valorEncontrado.length + 200)
                            const contextoComDestaque = contextoCompleto.substring(inicio, fim).replace(
                              new RegExp(valorEncontrado.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                              (match) => `<mark class="valor-destacado">${match}</mark>`
                            )
                            const inicioExibicao = posicaoValor - inicio
                            const fimExibicao = inicioExibicao + valorEncontrado.length
                            
                            return (
                              <div className="valor-contexto-card">
                                <strong>Contexto {item.paginaContexto ? `(Página ${item.paginaContexto})` : ''}:</strong>
                                <p dangerouslySetInnerHTML={{ __html: 
                                  (inicio > 0 ? '...' : '') + 
                                  contextoComDestaque.substring(0, inicioExibicao) +
                                  `<mark class="valor-destacado">${valorEncontrado}</mark>` +
                                  contextoComDestaque.substring(fimExibicao) + 
                                  (fim < contextoCompleto.length ? '...' : '')
                                }}></p>
                              </div>
                            )
                          }
                          
                          // Se não encontrou, destacar qualquer valor monetário no contexto completo
                          // (já que sabemos que o valor está lá pela verificação anterior)
                          const contextoComDestaque = contextoCompleto.replace(
                            REGEX_VALOR,
                            (match) => {
                              const valorNum = parseValorFormatado(match)
                              if (Math.abs(valorNum - valorNumericoItem) < 0.01) {
                                return `<mark class="valor-destacado">${match}</mark>`
                              }
                              return match
                            }
                          )
                          
                          return (
                            <div className="valor-contexto-card">
                              <strong>Contexto {item.paginaContexto ? `(Página ${item.paginaContexto})` : ''}:</strong>
                              <p dangerouslySetInnerHTML={{ __html: 
                                contextoComDestaque.substring(0, 600) + (contextoCompleto.length > 600 ? '...' : '')
                              }}></p>
                            </div>
                          )
                        })()}
                            </div>
                            )
                          })
                        }
                        
                        // Lógica original para outros motores
                        // Filtrar valores >= R$ 15.000
                        const valoresAcima15k = resultado.todosValores.filter(item => {
                          const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                          return valorNumerico >= 15000
                        })
                        
                        // Se houver valores >= R$ 15.000, começar com eles
                        let valoresParaMostrar = valoresAcima15k.length > 0 ? valoresAcima15k : []
                        
                        // Se tiver menos de 4 valores acima de R$ 15.000, completar com os demais
                        if (valoresParaMostrar.length < 4) {
                          const valoresAbaixo15k = resultado.todosValores.filter(item => {
                            const valorNumerico = parseFloat(item.valor.replace(/[^\d,]/g, '').replace(',', '.'))
                            return valorNumerico < 15000
                          })
                          // Adicionar valores abaixo de R$ 15.000 até completar 4
                          const faltam = 4 - valoresParaMostrar.length
                          valoresParaMostrar = [...valoresParaMostrar, ...valoresAbaixo15k.slice(0, faltam)]
                        }
                        
                        // Se não houver valores >= R$ 15.000, mostrar todos
                        if (valoresAcima15k.length === 0) {
                          valoresParaMostrar = resultado.todosValores
                        }
                        
                        // Aplicar limite de 4 para ambos os motores
                        const valoresFinais = valoresParaMostrar.slice(0, 4)
                        
                        return valoresFinais.map((item, idx) => {
                        const temCondena = item.palavrasEncontradas && (item.palavrasEncontradas.includes('condena') || item.palavrasEncontradas.includes('condenação'))
                        const temHomologo = item.palavrasEncontradas && item.palavrasEncontradas.includes('homologo')
                        const temPrioridade = temCondena || temHomologo || item.ehPrioritario
                        return (
                        <div key={idx} className={`item-valor-card ${temPrioridade ? 'tem-prioridade' : ''}`}>
                          <div className="valor-header-card">
                            <span className="posicao-badge">#{idx + 1}</span>
                            <span className="valor-numero-card">{item.valor}</span>
                            <span className="pontuacao-badge">{item.pontos} {item.pontos === 1 ? 'ponto' : 'pontos'}</span>
                          </div>
                      {item.palavrasEncontradas && item.palavrasEncontradas.length > 0 && (
                        <div className="palavras-encontradas">
                          <strong>Palavras que pontuaram:</strong>
                          <div className="tags-palavras">
                            {item.palavrasEncontradas.map((palavra, pIdx) => (
                              <span key={pIdx} className="tag-palavra">{palavra}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.contexto && (() => {
                        const contextoCompleto = item.contexto
                        const REGEX_VALOR = /R\$\s*[\d\.\s]{1,20},\d{1,2}/gi
                        
                        // Extrair o valor numérico do item.valor (ex: "R$ 50.000,00" -> 50000.00)
                        const parseValorFormatado = (str) => {
                          const limpo = str.replace(/[^\d,]/g, '').replace(',', '.')
                          return parseFloat(limpo)
                        }
                        
                        const valorNumericoItem = parseValorFormatado(item.valor)
                        
                        // Encontrar todos os valores monetários no contexto
                        REGEX_VALOR.lastIndex = 0
                        let match
                        let valorEncontrado = null
                        let posValor = -1
                        
                        while ((match = REGEX_VALOR.exec(contextoCompleto)) !== null) {
                          const valorStr = match[0]
                          const valorNumerico = parseValorFormatado(valorStr)
                          // Comparar com tolerância para valores decimais
                          if (Math.abs(valorNumerico - valorNumericoItem) < 0.01) {
                            valorEncontrado = valorStr
                            posValor = match.index
                            break
                          }
                        }
                        
                        if (valorEncontrado && posValor >= 0) {
                          const inicioExibicao = Math.max(0, posValor - 200)
                          const fimExibicao = Math.min(contextoCompleto.length, posValor + valorEncontrado.length + 200)
                          const contextoExibido = contextoCompleto.substring(inicioExibicao, fimExibicao)
                          const posValorNoExibido = posValor - inicioExibicao
                          const contextoComDestaque = contextoExibido.substring(0, posValorNoExibido) +
                            `<mark class="valor-destacado">${valorEncontrado}</mark>` +
                            contextoExibido.substring(posValorNoExibido + valorEncontrado.length)
                          
                          return (
                            <div className="valor-contexto-card">
                              <strong>Contexto {item.paginaContexto ? `(Página ${item.paginaContexto})` : ''}:</strong>
                              <p dangerouslySetInnerHTML={{ __html: 
                                (inicioExibicao > 0 ? '...' : '') + 
                                contextoComDestaque + 
                                (fimExibicao < contextoCompleto.length ? '...' : '')
                              }}></p>
                            </div>
                          )
                        }
                        
                        // Se não encontrou, destacar qualquer valor monetário no contexto completo
                        // (já que sabemos que o valor está lá pela verificação anterior)
                        const contextoComDestaque = contextoCompleto.replace(
                          REGEX_VALOR,
                          (match) => {
                            const valorNum = parseValorFormatado(match)
                            if (Math.abs(valorNum - valorNumericoItem) < 0.01) {
                              return `<mark class="valor-destacado">${match}</mark>`
                            }
                            return match
                          }
                        )
                        
                        return (
                          <div className="valor-contexto-card">
                            <strong>Contexto {item.paginaContexto ? `(Página ${item.paginaContexto})` : ''}:</strong>
                            <p dangerouslySetInnerHTML={{ __html: 
                              contextoComDestaque.substring(0, 600) + (contextoCompleto.length > 600 ? '...' : '')
                            }}></p>
                          </div>
                        )
                      })()}
                        </div>
                        )
                      })
                      })()}
                    </div>
              </div>
            )}
                </div>
              )}
                </>
              )}

              {abaAtiva === 'resumo' && (
                <div className="resumo-container">
                  <h2>Resumo de Processos</h2>
                  {resultadosResumo.size === 0 ? (
                    <p className="sem-resultados">Nenhum processo analisado ainda. Analise processos na aba "Análise" para ver o resumo aqui.</p>
                  ) : (
                    <div className="tabela-resumo-container">
                      <table className="tabela-resumo">
                        <thead>
                          <tr>
                            <th>Processo</th>
                            <th>Valor 1</th>
                            <th>Valor 2</th>
                            <th>Valor 3</th>
                            <th>Valor 4</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaProcessos.map((processo, index) => {
                            const resultadoProcesso = resultadosResumo.get(processo.nome)
                            const topValores = resultadoProcesso?.todosValores?.slice(0, 4) || []
                            const status = resultadoProcesso ? 'Analisado' : 'Não analisado'
                            
                            // Garantir 4 valores (preencher com null se necessário)
                            const valores = [...topValores]
                            while (valores.length < 4) {
                              valores.push(null)
                            }
                            
                            return (
                              <tr key={index} className={resultadoProcesso ? 'processo-analisado' : 'processo-nao-analisado'}>
                                <td className="processo-cell">
                                  <button
                                    className="link-processo"
                                    onClick={() => {
                                      setAbaAtiva('analise')
                                      selecionarProcesso(processo)
                                    }}
                                  >
                                    {extrairNomeLimpo(processo.nome, processo.arquivo)}
                                  </button>
                                </td>
                                {valores.map((valor, vIdx) => (
                                  <td key={vIdx} className="valor-cell-resumo">
                                    {valor ? (
                                      <div className="valor-item-resumo">
                                        <div className="valor-moeda-resumo">{valor.valor}</div>
                                        <div className="valor-info-resumo">
                                          <span className="pontos-badge-resumo">{valor.pontos} pts</span>
                                          {valor.palavrasEncontradas && valor.palavrasEncontradas.length > 0 && (
                                            <div className="palavras-resumo">
                                              {valor.palavrasEncontradas.slice(0, 3).map((palavra, pIdx) => (
                                                <span key={pIdx} className="tag-palavra-resumo">{palavra}</span>
                                              ))}
                                              {valor.palavrasEncontradas.length > 3 && (
                                                <span className="tag-palavra-resumo">+{valor.palavrasEncontradas.length - 3}</span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="valor-vazio">-</span>
                                    )}
                                  </td>
                                ))}
                                <td className="status-cell">
                                  <span className={`status-badge ${status === 'Analisado' ? 'analisado' : 'nao-analisado'}`}>
                                    {status}
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal da Árvore de Regras */}
      {mostrarArvoreRegras && (
        <div className="modal-overlay" onClick={() => setMostrarArvoreRegras(false)}>
          <div className="modal-arvore-regras" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <h2>📋 Regra de Extração de Valores</h2>
                <div className="seletor-modelo-modal">
                  <span className="label-modelo-modal">Ver regras do:</span>
                  <button 
                    className={`btn-modelo-modal ${modeloRegras === 1 ? 'ativo' : ''}`}
                    onClick={() => setModeloRegras(1)}
                  >
                    Modelo 1
                  </button>
                  <button 
                    className={`btn-modelo-modal ${modeloRegras === 2 ? 'ativo' : ''}`}
                    onClick={() => setModeloRegras(2)}
                  >
                    Modelo 2
                  </button>
                  <button 
                    className={`btn-modelo-modal ${modeloRegras === 3 ? 'ativo' : ''}`}
                    onClick={() => setModeloRegras(3)}
                  >
                    Modelo 3
                  </button>
                  {/* Modelo 4 oculto temporariamente */}
                  {/* <button 
                    className={`btn-modelo-modal ${modeloRegras === 4 ? 'ativo' : ''}`}
                    onClick={() => setModeloRegras(4)}
                  >
                    Modelo 4
                  </button> */}
                </div>
              </div>
              <button className="btn-fechar" onClick={() => setMostrarArvoreRegras(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="arvore-regras">
                {modeloRegras === 1 && (
                  <>
                <div className="arvore-item">
                  <span className="arvore-icone">🎯</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 1: Área de Busca</strong>
                    <ul>
                      <li>Iniciar nos últimos 50% do documento</li>
                      <li>Se não encontrar valores, expandir em +10% até 100%</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">💰</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 2: Filtro de Valores</strong>
                    <ul>
                      <li>Apenas valores &gt;= R$ 15.000,00</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🔍</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 3: Extração de Contexto</strong>
                    <ul>
                      <li>Para cada valor encontrado: extrair 500 caracteres antes e depois</li>
                      <li>Verificar se o valor monetário está presente no contexto</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📝</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 4: Busca de Expressões</strong>
                    <div className="arvore-subitem">
                      <div className="regex-box regex-prioridade">
                        <strong>🔴 Regex1 (PRIORIDADE - EXATOS):</strong>
                        <ul>
                          <li>condena</li>
                          <li>condenação</li>
                          <li>homologo</li>
                          <li>novo</li>
                          <li>nova</li>
                          <li>arbitra</li>
                          <li>rearbitra</li>
                          <li>arbitrado</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Regex2 (SECUNDÁRIO - VARIAÇÕES):</strong>
                        <ul>
                          <li>condenado, condenada, condenados, condenadas</li>
                          <li>atribui*, provisor*, majora*</li>
                          <li>diminui*, retifica*</li>
                          <li>fixa*, fixo*</li>
                          <li>debit*</li>
                          <li>homolog* (variações)</li>
                          <li>atualiz* (também tem prioridade quando encontrado)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">⚖️</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 5: Pontuação</strong>
                    <ul>
                      <li>Cada palavra única encontrada no contexto conta 1 ponto</li>
                      <li>Exemplo: se encontrar "condena", "arbitrado" e "fixo" = 3 pontos</li>
                      <li>Usar a MAIOR pontuação encontrada (não somar ocorrências)</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🏆</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 6: Ordenação (Prioridade)</strong>
                    <p style={{marginBottom: '10px', fontWeight: '600'}}>Os valores são ordenados nesta ordem:</p>
                    <ol>
                      <li>Valores com "homologo" aparecem primeiro</li>
                      <li>Valores com "condena" ou "condenação" aparecem em seguida</li>
                      <li>Valores com "novo" ou "nova" aparecem depois</li>
                      <li>Valores com "arbitra", "rearbitra" ou "arbitrado" aparecem depois</li>
                      <li>Valores com "atualiz", "atualizado", etc. aparecem depois</li>
                      <li>Todos os outros valores aparecem por último</li>
                    </ol>
                    <p style={{marginTop: '15px', marginBottom: '10px', fontWeight: '600'}}>Desempate (quando dois valores estão na mesma categoria):</p>
                    <ul>
                      <li>Quem tem mais palavras prioritárias diferentes aparece antes</li>
                      <li>Se ainda empatar, quem tem mais pontos totais aparece antes</li>
                    </ul>
                    <p style={{marginTop: '15px', fontStyle: 'italic', color: '#666'}}>Resumo: Cada palavra = 1 ponto. Quanto mais palavras prioritárias, melhor o ranking.</p>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📊</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 7: Resultado</strong>
                    <ul>
                      <li>Exibir top 4 valores encontrados</li>
                      <li>Destacar valores com prioridade (borda vermelha)</li>
                      <li>Mostrar palavras que pontuaram, contexto e página</li>
                    </ul>
                  </div>
                </div>
                  </>
                )}
                
                {modeloRegras === 2 && (
                  <>
                <div className="arvore-item">
                  <span className="arvore-icone">🎯</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 1: Área de Busca</strong>
                    <ul>
                      <li>Documentos com &lt; 100 páginas: processar 100% do documento</li>
                      <li>Documentos com ≥ 100 páginas: iniciar nos últimos 50%</li>
                      <li>Se não encontrar valores, expandir em +10% até 100%</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">💰</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 2: Filtro de Valores</strong>
                    <ul>
                      <li>Limite inicial: R$ 1.000,00</li>
                      <li>Se não encontrar valores, reduzir para R$ 500,00</li>
                      <li>Valores acima de R$ 100.000.000 são ignorados</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🔍</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 3: Extração de Contexto</strong>
                    <ul>
                      <li>Para cada valor encontrado: extrair 500 caracteres antes e depois</li>
                      <li>Verificar se o valor monetário está presente no contexto</li>
                      <li>Excluir valores se "honorários" estiver a menos de 3 palavras do valor</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📝</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 4: Busca de Expressões</strong>
                    <div className="arvore-subitem">
                      <div className="regex-box regex-prioridade">
                        <strong>🔴 Regex1 (PRIORIDADE - EXATOS):</strong>
                        <ul>
                          <li>condena</li>
                          <li>condenação</li>
                          <li>homologo</li>
                          <li>novo</li>
                          <li>nova</li>
                          <li>arbitra</li>
                          <li>rearbitra</li>
                          <li>arbitrado</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Regex2 (SECUNDÁRIO - VARIAÇÕES):</strong>
                        <ul>
                          <li>condenado, condenada, condenados, condenadas</li>
                          <li>atribui*, diminui*, retifica*</li>
                          <li>fixa*, fixo*</li>
                          <li>debit*</li>
                          <li>homolog* (variações)</li>
                          <li>atualiz* (também tem prioridade quando encontrado)</li>
                          <li>execu* (execução, executar, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">⚖️</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 5: Pontuação</strong>
                    <ul>
                      <li>Cada palavra única encontrada no contexto conta 1 ponto</li>
                      <li>Usar a MAIOR pontuação encontrada (não somar ocorrências)</li>
                      <li>Se "condenação" estiver a 50 caracteres ou menos antes do valor, marca como próximo</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🏆</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 6: Ordenação (Prioridade)</strong>
                    <p style={{marginBottom: '10px', fontWeight: '600'}}>Valores Prioritários (condena/homologo) sempre vêm primeiro:</p>
                    <ol>
                      <li>Valores com 4+ pontos e prioritários</li>
                      <li>Valores com "condenação" próxima (50 chars antes)</li>
                      <li>Ordenar por pontos (mais pontos primeiro)</li>
                      <li>Em empate: priorizar "homologo" sobre "condena"</li>
                      <li>Em empate total: valor maior primeiro</li>
                    </ol>
                    <p style={{marginTop: '15px', marginBottom: '10px', fontWeight: '600'}}>Valores Não-Prioritários:</p>
                    <ol>
                      <li>Valores com "novo" ou "nova" (ordenar por valor maior)</li>
                      <li>Valores com "arbitra", "rearbitra" ou "arbitrado" (ordenar por valor maior)</li>
                      <li>Valores com "atualiz*" (ordenar por valor maior)</li>
                      <li>Demais valores (ordenar por pontos)</li>
                    </ol>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📊</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 7: Resultado</strong>
                    <ul>
                      <li>Mostrar valores >= R$ 15.000 primeiro</li>
                      <li>Se houver menos de 4 valores >= R$ 15.000, completar com valores abaixo</li>
                      <li>Exibir até 4 resultados</li>
                      <li>Destacar valores prioritários (borda vermelha)</li>
                    </ul>
                  </div>
                </div>
                  </>
                )}
                
                {modeloRegras === 3 && (
                  <>
                <div className="arvore-item">
                  <span className="arvore-icone">🎯</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 1: Área de Busca</strong>
                    <ul>
                      <li>Documentos com &lt; 100 páginas: processar 100% do documento</li>
                      <li>Documentos com ≥ 100 páginas: iniciar nos últimos 50%</li>
                      <li>Se não encontrar valores, expandir em +10% até 100%</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">💰</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 2: Filtro de Valores</strong>
                    <ul>
                      <li>Limite inicial: R$ 1.000,00</li>
                      <li>Se não encontrar valores, reduzir para R$ 500,00</li>
                      <li>Valores acima de R$ 100.000.000 são ignorados</li>
                      <li>Aceita valores com 1 ou 2 dígitos após vírgula (R$ 153.717,7 ou R$ 153.717,70)</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🔍</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 3: Extração de Contexto</strong>
                    <ul>
                      <li>Para cada valor encontrado: extrair 500 caracteres antes e depois</li>
                      <li>Verificar se o valor monetário está presente no contexto</li>
                      <li>Excluir valores se "honorários" estiver a menos de 3 palavras do valor</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📝</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 4: Busca de Expressões</strong>
                    <div className="arvore-subitem">
                      <div className="regex-box regex-prioridade">
                        <strong>🔴 Palavras Prioritárias (Exatas):</strong>
                        <ul>
                          <li>condena</li>
                          <li>condenação</li>
                          <li>homologo</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Palavras Secundárias (Exatas):</strong>
                        <ul>
                          <li>condenado, condenada, condenados, condenadas</li>
                          <li>novo, nova</li>
                          <li>arbitra, rearbitra, arbitrado</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Palavras Secundárias (Prefixos):</strong>
                        <ul>
                          <li>atribui*, diminui*, retifica*</li>
                          <li>fixa*, fixo*</li>
                          <li>debit*</li>
                          <li>homolog* (variações)</li>
                          <li>atualiz* (vira prioritário se tiver palavras prioritárias)</li>
                          <li>execu* (execução, executar, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">⚖️</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 5: Pontuação</strong>
                    <ul>
                      <li>Cada palavra única encontrada no contexto conta 1 ponto</li>
                      <li>Usar a MAIOR pontuação encontrada (não somar ocorrências)</li>
                      <li>Se "condenação" estiver a 50 caracteres ou menos antes do valor, marca como próximo</li>
                      <li>Valores são marcados como "prioritários" se contiverem: condena, condenação ou homologo (exato)</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🏆</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 6: Ordenação (Prioridade)</strong>
                    <p style={{marginBottom: '10px', fontWeight: '600'}}>Valores Prioritários sempre vêm primeiro:</p>
                    <ol>
                      <li>Valores com 4+ pontos e prioritários</li>
                      <li>Valores com "condenação" próxima (50 chars antes)</li>
                      <li>Ordenar por pontos (mais pontos primeiro)</li>
                      <li>Em empate: priorizar "homologo" sobre "condena"</li>
                      <li>Em empate total: valor maior primeiro</li>
                    </ol>
                    <p style={{marginTop: '15px', marginBottom: '10px', fontWeight: '600'}}>Valores Não-Prioritários:</p>
                    <ol>
                      <li>Valores com "novo" ou "nova" (ordenar por valor maior)</li>
                      <li>Valores com "arbitra", "rearbitra" ou "arbitrado" (ordenar por valor maior)</li>
                      <li>Valores com "atualiz*" (ordenar por valor maior)</li>
                      <li>Demais valores (ordenar por pontos)</li>
                    </ol>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📊</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 7: Resultado</strong>
                    <ul>
                      <li>Mostrar valores >= R$ 15.000 primeiro</li>
                      <li>Se houver menos de 4 valores >= R$ 15.000, completar com valores abaixo</li>
                      <li>Exibir até 4 resultados</li>
                      <li>Destacar valores prioritários (borda vermelha)</li>
                    </ul>
                  </div>
                </div>
                  </>
                )}
                
                {modeloRegras === 4 && (
                  <>
                <div className="arvore-item">
                  <span className="arvore-icone">ℹ️</span>
                  <div className="arvore-conteudo">
                    <strong>Motor 4: Mesmas regras do Motor 3 com exibição atualizada</strong>
                    <p style={{marginTop: '10px', color: '#666'}}>
                      O Motor 4 é idêntico ao Motor 3 em todas as regras de processamento, mas com uma diferença importante na ordem de exibição:
                    </p>
                      <ul style={{marginTop: '10px'}}>
                        <li><strong>Priorização de Exibição:</strong> Valores com borda vermelha (prioritários) sempre aparecem primeiro, independente do valor monetário</li>
                        <li>Dentro do grupo de borda vermelha: valores &gt;= R$ 15.000 aparecem antes dos &lt; R$ 15.000</li>
                        <li>Depois, valores sem borda vermelha: valores &gt;= R$ 15.000 aparecem antes dos &lt; R$ 15.000</li>
                      </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🎯</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 1: Área de Busca</strong>
                    <ul>
                      <li>Documentos com &lt; 100 páginas: processar 100% do documento</li>
                      <li>Documentos com ≥ 100 páginas: iniciar nos últimos 50%</li>
                      <li>Se não encontrar valores, expandir em +10% até 100%</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">💰</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 2: Filtro de Valores</strong>
                    <ul>
                      <li>Limite inicial: R$ 1.000,00</li>
                      <li>Se não encontrar valores, reduzir para R$ 500,00</li>
                      <li>Valores acima de R$ 100.000.000 são ignorados</li>
                      <li>Aceita valores com 1 ou 2 dígitos após vírgula (R$ 153.717,7 ou R$ 153.717,70)</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🔍</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 3: Extração de Contexto</strong>
                    <ul>
                      <li>Para cada valor encontrado: extrair 500 caracteres antes e depois</li>
                      <li>Verificar se o valor monetário está presente no contexto</li>
                      <li>Excluir valores se "honorários" estiver a menos de 3 palavras do valor</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📝</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 4: Busca de Expressões</strong>
                    <div className="arvore-subitem">
                      <div className="regex-box regex-prioridade">
                        <strong>🔴 Palavras Prioritárias (Exatas):</strong>
                        <ul>
                          <li>condena</li>
                          <li>condenação</li>
                          <li>homologo</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Palavras Secundárias (Exatas):</strong>
                        <ul>
                          <li>condenado, condenada, condenados, condenadas</li>
                          <li>novo, nova</li>
                          <li>arbitra, rearbitra, arbitrado</li>
                        </ul>
                      </div>
                      <div className="regex-box regex-secundario">
                        <strong>🔵 Palavras Secundárias (Prefixos):</strong>
                        <ul>
                          <li>atribui*, diminui*, retifica*</li>
                          <li>fixa*, fixo*</li>
                          <li>debit*</li>
                          <li>homolog* (variações)</li>
                          <li>atualiz* (vira prioritário se tiver palavras prioritárias)</li>
                          <li>execu* (execução, executar, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">⚖️</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 5: Pontuação</strong>
                    <ul>
                      <li>Cada palavra única encontrada no contexto conta 1 ponto</li>
                      <li>Usar a MAIOR pontuação encontrada (não somar ocorrências)</li>
                      <li>Se "condenação" estiver a 50 caracteres ou menos antes do valor, marca como próximo</li>
                      <li>Valores são marcados como "prioritários" se contiverem: condena, condenação ou homologo (exato)</li>
                    </ul>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">🏆</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 6: Ordenação (Prioridade)</strong>
                    <p style={{marginBottom: '10px', fontWeight: '600'}}>Valores Prioritários sempre vêm primeiro:</p>
                    <ol>
                      <li>Valores com 4+ pontos e prioritários</li>
                      <li>Valores com "condenação" próxima (50 chars antes)</li>
                      <li>Ordenar por pontos (mais pontos primeiro)</li>
                      <li>Em empate: priorizar "homologo" sobre "condena"</li>
                      <li>Em empate total: valor maior primeiro</li>
                    </ol>
                    <p style={{marginTop: '15px', marginBottom: '10px', fontWeight: '600'}}>Valores Não-Prioritários:</p>
                    <ol>
                      <li>Valores com "novo" ou "nova" (ordenar por valor maior)</li>
                      <li>Valores com "arbitra", "rearbitra" ou "arbitrado" (ordenar por valor maior)</li>
                      <li>Valores com "atualiz*" (ordenar por valor maior)</li>
                      <li>Demais valores (ordenar por pontos)</li>
                    </ol>
                  </div>
                </div>

                <div className="arvore-item">
                  <span className="arvore-icone">📊</span>
                  <div className="arvore-conteudo">
                    <strong>PASSO 7: Resultado (DIFERENÇA DO MOTOR 3)</strong>
                    <ul>
                      <li><strong>PRIMEIRO:</strong> Mostrar valores com borda vermelha (prioritários) &gt;= R$ 15.000</li>
                      <li><strong>SEGUNDO:</strong> Mostrar valores com borda vermelha (prioritários) &lt; R$ 15.000</li>
                      <li><strong>TERCEIRO:</strong> Mostrar valores sem borda vermelha &gt;= R$ 15.000</li>
                      <li><strong>QUARTO:</strong> Mostrar valores sem borda vermelha &lt; R$ 15.000</li>
                      <li>Exibir até 4 resultados</li>
                      <li>Destacar valores prioritários (borda vermelha)</li>
                    </ul>
                  </div>
                </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
