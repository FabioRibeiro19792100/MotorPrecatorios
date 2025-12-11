# Instruções para Deploy no Vercel

## Problemas Corrigidos

1. ✅ Erros de JSX com caracteres `>=` corrigidos
2. ✅ Arquivo `vercel.json` criado
3. ✅ Configuração do Vite ajustada para produção

## Problema com PDFs

O diretório `public/Processos` atualmente é um **symlink** que aponta para uma pasta local. Isso não funcionará no Vercel.

### Solução 1: Copiar PDFs para public/Processos (Recomendado)

1. Remova o symlink:
   ```bash
   rm public/Processos
   ```

2. Crie a pasta real:
   ```bash
   mkdir -p public/Processos
   ```

3. Copie os PDFs:
   ```bash
   cp Processos/*.pdf public/Processos/
   ```

4. Commit e push:
   ```bash
   git add public/Processos/*.pdf
   git commit -m "Adicionar PDFs para deploy"
   git push
   ```

### Solução 2: Usar armazenamento externo (Futuro)

Para projetos maiores, considere usar:
- AWS S3
- Cloudinary
- Google Cloud Storage
- Outro serviço de armazenamento

E modificar o código para buscar PDFs via API.

## Deploy no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. O Vercel detectará automaticamente o `vercel.json`
3. O build deve funcionar automaticamente

## Verificação

Após o deploy, verifique se:
- ✅ A aplicação carrega
- ✅ Os PDFs são acessíveis em `/Processos/`
- ✅ O worker do PDF.js funciona (`/pdf.worker.min.mjs`)

