# Como Usar o Sistema de Precatórios

## Problema com iCloud

Como a pasta Documentos está sincronizada com o iCloud, os PDFs voltam para a nuvem mesmo após baixar.

## Solução: Script Automático

1. **Baixe os PDFs do iCloud** na pasta `Processos/`:
   - Abra a pasta `Processos/` no Finder
   - Para cada PDF com ícone de nuvem, clique com botão direito → "Download"
   - Aguarde o download concluir (ícone de nuvem desaparece)

2. **Execute o script de cópia**:
   ```bash
   ./copiar-pdfs.sh
   ```

   O script vai:
   - Verificar quais PDFs foram baixados
   - Copiar apenas os que estão realmente no disco (tamanho > 1KB)
   - Mostrar um resumo do que foi copiado

3. **Recarregue a página** do sistema e os PDFs devem funcionar!

## Executar o Script

Sempre que baixar novos PDFs do iCloud, execute:
```bash
cd "/Users/fabioribeiro/Documents/Precatórios"
./copiar-pdfs.sh
```

O script verifica automaticamente quais arquivos estão baixados e copia apenas esses.
