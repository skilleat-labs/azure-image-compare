const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PORT = 3000;

app.post('/api/generate-image', async (req, res) => {
  const { endpoint, apiKey, model, prompt } = req.body;

  console.log(`[DEBUG] 받은 모델명: "${model}" (타입: ${typeof model}, 길이: ${model?.length})`);
  console.log(`[DEBUG] 모든 요청 데이터:`, JSON.stringify(req.body, null, 2));

  if (!endpoint || !apiKey || !model || !prompt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const normalizedEndpoint = endpoint
      .trim()
      .replace(/\/+$/, '') // 끝의 슬래시 제거
      .replace(/\/(openai|mai)(\/v1)?$/i, ''); // /openai/v1 또는 /mai/v1 제거
    
    let url, requestBody, headers;

    // MAI-Image-2e는 다른 API 경로와 헤더 사용
    if (model.includes('MAI') || model.includes('mai')) {
      url = `${normalizedEndpoint}/mai/v1/images/generations`;
      requestBody = {
        prompt,
        model,
        width: 1024,
        height: 1024,
        output_format: 'png'
      };
      headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey
      };
    } else {
      // gpt-image-2 및 다른 모델
      url = `${normalizedEndpoint}/openai/v1/images/generations`;
      requestBody = {
        prompt,
        model,
        size: '1024x1024',
        n: 1,
        output_format: 'png'
      };
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };
    }

    console.log(`[DEBUG] 정규화 전 endpoint: ${endpoint}`);
    console.log(`[DEBUG] 정규화 후 endpoint: ${normalizedEndpoint}`);
    console.log(`[DEBUG] 최종 URL: ${url}`);
    console.log(`[DEBUG] 요청 헤더:`, headers);
    console.log(`[DEBUG] 요청 Body:`, requestBody);

    const response = await axios.post(url, requestBody, { headers });

    return res.json(response.data);
  } catch (error) {
    console.error('[ERROR] Foundry 응답:', error.response?.status, error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
