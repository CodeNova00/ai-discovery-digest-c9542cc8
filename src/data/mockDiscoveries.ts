import DiscoveryCardProps from "@/types/DiscoveryCard";

export const mockDiscoveries: DiscoveryCardProps[] = [
  {
    id: "1",
    title: "GPT-4-Vision: Multimodal Capabilities for Analyzing Images",
    description: "New model from OpenAI that can analyze and understand images, providing detailed descriptions and answering questions about visual content.",
    tags: ["multimodal", "vision", "GPT", "OpenAI"],
    date: "2025-03-15",
    category: "Multimodal",
    source: "github",
    url: "https://github.com/openai/gpt-4-vision",
    imageUrl: "https://picsum.photos/seed/gpt4v/400/200"
  },
  {
    id: "2",
    title: "DALL-E 3: Improved Image Generation with Better Control",
    description: "Latest version of DALL-E with enhanced control over image composition, style consistency, and text rendering within generated images.",
    tags: ["image-generation", "DALL-E", "AI-art"],
    date: "2025-03-10",
    category: "Computer Vision",
    source: "huggingface",
    url: "https://huggingface.co/models/dalle-3-enhanced",
    imageUrl: "https://picsum.photos/seed/dalle3/400/200"
  },
  {
    id: "3",
    title: "Transformer Architecture Improvements for Efficient NLP",
    description: "Research paper proposing novel optimization techniques that reduce computational requirements of transformer models by 40% while maintaining performance.",
    tags: ["transformer", "efficiency", "NLP", "optimization"],
    date: "2025-03-05",
    category: "NLP",
    source: "arxiv",
    url: "https://arxiv.org/abs/2025.12345",
    imageUrl: "https://picsum.photos/seed/transformer/400/200"
  },
  {
    id: "4",
    title: "CodeLlama: Advanced Code Generation and Understanding",
    description: "A family of large language models for code, capable of generating, explaining, and debugging complex code snippets across multiple programming languages.",
    tags: ["code-generation", "programming", "LLM"],
    date: "2025-03-01",
    category: "Code",
    source: "github",
    url: "https://github.com/meta-llama/codellama",
    imageUrl: "https://picsum.photos/seed/codellama/400/200"
  },
  {
    id: "5",
    title: "BioMedLM: Large Language Model for Medical Research",
    description: "Specialized language model trained on medical literature, clinical notes, and research papers, designed to assist with medical research and information retrieval.",
    tags: ["healthcare", "medical", "research", "specialized-LLM"],
    date: "2025-02-25",
    category: "Healthcare",
    source: "huggingface",
    url: "https://huggingface.co/models/biomedlm",
    imageUrl: "https://picsum.photos/seed/biomedlm/400/200"
  },
  {
    id: "6",
    title: "Neural Radiance Fields for Real-time 3D Scene Reconstruction",
    description: "Novel approach to real-time 3D scene reconstruction using neural radiance fields, enabling photorealistic rendering of complex environments from sparse inputs.",
    tags: ["NeRF", "3D-reconstruction", "computer-vision", "rendering"],
    date: "2025-02-20",
    category: "Computer Vision",
    source: "arxiv",
    url: "https://arxiv.org/abs/2025.54321",
    imageUrl: "https://picsum.photos/seed/nerf/400/200"
  },
  {
    id: "7",
    title: "Gemini Ultra: Google's Most Capable Multimodal AI",
    description: "Google's most advanced AI model, capable of understanding and processing text, images, audio, and video with state-of-the-art performance across benchmarks.",
    tags: ["multimodal", "Google", "Gemini", "state-of-the-art"],
    date: "2025-02-15",
    category: "Multimodal",
    source: "github",
    url: "https://github.com/google/gemini-ultra",
    imageUrl: "https://picsum.photos/seed/gemini/400/200"
  },
  {
    id: "8",
    title: "Quantum Machine Learning: Algorithms for NISQ Devices",
    description: "Research exploring practical quantum machine learning algorithms that can run on current noisy intermediate-scale quantum (NISQ) devices for real-world applications.",
    tags: ["quantum", "QML", "NISQ", "algorithms"],
    date: "2025-02-10",
    category: "Quantum AI",
    source: "arxiv",
    url: "https://arxiv.org/abs/2025.98765",
    imageUrl: "https://picsum.photos/seed/quantum/400/200"
  }
];

export const categoryCount = {
  "Multimodal": 15,
  "Computer Vision": 24,
  "NLP": 31,
  "Healthcare": 8,
  "Code": 12,
  "Quantum AI": 5,
  "Reinforcement Learning": 10,
  "Robotics": 7,
  "Audio AI": 6,
  "Large Language Models": 28
};

export const sourceDistribution = {
  "GitHub": 34,
  "Hugging Face": 28,
  "ArXiv": 44,
};

export const weeklyPublications = [
  { name: "Week 1", count: 12 },
  { name: "Week 2", count: 15 },
  { name: "Week 3", count: 9 },
  { name: "Week 4", count: 18 },
  { name: "Week 5", count: 14 },
  { name: "Week 6", count: 21 },
  { name: "Week 7", count: 16 },
  { name: "Week 8", count: 23 }
];

export const categoryTrends = [
  { name: "Jan", NLP: 15, CV: 12, Multimodal: 8 },
  { name: "Feb", NLP: 18, CV: 14, Multimodal: 10 },
  { name: "Mar", NLP: 16, CV: 17, Multimodal: 14 },
  { name: "Apr", NLP: 21, CV: 19, Multimodal: 17 }
];
