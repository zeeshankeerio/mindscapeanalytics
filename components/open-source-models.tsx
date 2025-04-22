"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Brain, Code, Copy, ExternalLink, Github, GitMerge, Star } from "lucide-react"

export default function OpenSourceModels() {
  const [activeTab, setActiveTab] = useState("vision")

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-60"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OPEN SOURCE</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Leverage <span className="text-red-500">Open Source Models</span> in Your Solutions
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Mindscape Analytics integrates with leading open-source AI models, giving you flexibility and control over
            your AI infrastructure.
          </p>
        </div>

        <Tabs defaultValue="vision" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              <TabsTrigger value="vision" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Computer Vision
              </TabsTrigger>
              <TabsTrigger value="nlp" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Natural Language
              </TabsTrigger>
              <TabsTrigger value="multimodal" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Multimodal
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Audio & Speech
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vision" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "YOLOv8",
                  description: "State-of-the-art object detection model with excellent speed-accuracy balance",
                  stars: "32.5k",
                  license: "AGPL-3.0",
                  tasks: ["Object Detection", "Instance Segmentation", "Classification"],
                  frameworks: ["PyTorch", "ONNX", "TensorRT"],
                  repo: "ultralytics/ultralytics",
                  paper: "https://arxiv.org/abs/2305.09972",
                  code: `
# pip install ultralytics
from ultralytics import YOLO

# Load a pretrained model
model = YOLO('yolov8n.pt')

# Run inference
results = model('image.jpg')

# Process results
for r in results:
    boxes = r.boxes  # Boxes object for bbox outputs
    masks = r.masks  # Masks object for segmentation masks
    probs = r.probs  # Class probabilities
                  `,
                },
                {
                  name: "CLIP",
                  description: "Connects text and images, enabling zero-shot image classification and retrieval",
                  stars: "25.8k",
                  license: "MIT",
                  tasks: ["Image-Text Embedding", "Zero-shot Classification", "Image Retrieval"],
                  frameworks: ["PyTorch", "Hugging Face"],
                  repo: "openai/CLIP",
                  paper: "https://arxiv.org/abs/2103.00020",
                  code: `
# pip install torch clip
import torch
import clip
from PIL import Image

# Load the model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Prepare the inputs
image = preprocess(Image.open("image.jpg")).unsqueeze(0).to(device)
text = clip.tokenize(["a dog", "a cat"]).to(device)

# Calculate features
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    
    # Calculate similarity
    logits_per_image = image_features @ text_features.T
    probs = logits_per_image.softmax(dim=-1)
                  `,
                },
                {
                  name: "SAM (Segment Anything)",
                  description: "Foundation model for image segmentation that can segment any object in an image",
                  stars: "41.2k",
                  license: "Apache-2.0",
                  tasks: ["Image Segmentation", "Prompt-based Segmentation", "Zero-shot Segmentation"],
                  frameworks: ["PyTorch", "Hugging Face"],
                  repo: "facebookresearch/segment-anything",
                  paper: "https://arxiv.org/abs/2304.02643",
                  code: `
# pip install segment-anything
import torch
from segment_anything import SamPredictor, sam_model_registry
from PIL import Image
import numpy as np

# Load the model
sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h_4b8939.pth")
sam.to(device="cuda")
predictor = SamPredictor(sam)

# Set image
image = np.array(Image.open("image.jpg"))
predictor.set_image(image)

# Get masks from points
input_point = np.array([[500, 375]])
input_label = np.array([1])
masks, scores, logits = predictor.predict(
    point_coords=input_point,
    point_labels=input_label,
    multimask_output=True,
)
                  `,
                },
              ].map((model, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300 h-full"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{model.name}</CardTitle>
                        <CardDescription className="mt-1">{model.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{model.stars}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {model.tasks.map((task, i) => (
                        <Badge key={i} className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">License</span>
                        <span>{model.license}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Frameworks</span>
                        <span>{model.frameworks.join(", ")}</span>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="bg-black/50 rounded-md p-3 text-xs overflow-x-auto max-h-[150px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <code className="text-white/80">{model.code}</code>
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 bg-black/50 hover:bg-black/70"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1 border-white/10 hover:bg-white/5">
                      <Github className="h-4 w-4" />
                      {model.repo}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 border-white/10 hover:bg-white/5">
                      <ExternalLink className="h-4 w-4" />
                      Paper
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nlp" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Llama 2",
                  description:
                    "Open-source large language model from Meta, fine-tuned for chat and instruction following",
                  stars: "45.2k",
                  license: "Llama 2 Community License",
                  tasks: ["Text Generation", "Chat", "Instruction Following"],
                  frameworks: ["PyTorch", "Hugging Face"],
                  repo: "meta-llama/llama",
                  paper: "https://arxiv.org/abs/2307.09288",
                  code: `
# pip install transformers
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load model and tokenizer
model_id = "meta-llama/Llama-2-7b-chat-hf"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

# Generate text
prompt = "Hey, how are you doing today?"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(
    inputs.input_ids,
    max_length=100,
    temperature=0.7,
    top_p=0.9
)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
                  `,
                },
                {
                  name: "Mistral 7B",
                  description: "Powerful open-source language model that outperforms many larger models",
                  stars: "15.7k",
                  license: "Apache-2.0",
                  tasks: ["Text Generation", "Classification", "Question Answering"],
                  frameworks: ["PyTorch", "Hugging Face"],
                  repo: "mistralai/mistral-src",
                  paper: "https://arxiv.org/abs/2310.06825",
                  code: `
# pip install transformers
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model and tokenizer
model_id = "mistralai/Mistral-7B-Instruct-v0.2"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

# Format prompt
messages = [
    {"role": "user", "content": "Explain quantum computing in simple terms"}
]
prompt = tokenizer.apply_chat_template(messages, tokenize=False)

# Generate response
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(inputs.input_ids, max_new_tokens=512)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
                  `,
                },
                {
                  name: "MPT-7B",
                  description: "MosaicML Pretrained Transformer, trained on 1T tokens of text and code",
                  stars: "3.8k",
                  license: "Apache-2.0",
                  tasks: ["Text Generation", "Code Generation", "Instruction Following"],
                  frameworks: ["PyTorch", "Hugging Face"],
                  repo: "mosaicml/mpt-7b",
                  paper: "https://www.mosaicml.com/blog/mpt-7b",
                  code: `
# pip install transformers
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model and tokenizer
model_id = "mosaicml/mpt-7b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    trust_remote_code=True
)

# Generate text
prompt = "### Instruction: Write a short poem about AI.\n\n### Response:"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(
    inputs.input_ids,
    max_new_tokens=100,
    temperature=0.8
)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
                  `,
                },
              ].map((model, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300 h-full"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{model.name}</CardTitle>
                        <CardDescription className="mt-1">{model.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{model.stars}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {model.tasks.map((task, i) => (
                        <Badge key={i} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">License</span>
                        <span>{model.license}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Frameworks</span>
                        <span>{model.frameworks.join(", ")}</span>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="bg-black/50 rounded-md p-3 text-xs overflow-x-auto max-h-[150px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <code className="text-white/80">{model.code}</code>
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 bg-black/50 hover:bg-black/70"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1 border-white/10 hover:bg-white/5">
                      <Github className="h-4 w-4" />
                      {model.repo}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 border-white/10 hover:bg-white/5">
                      <ExternalLink className="h-4 w-4" />
                      Paper
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="multimodal" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Multimodal models would go here - similar structure to above */}
              {/* For brevity, I'm not including all the models for each tab */}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Audio models would go here - similar structure to above */}
              {/* For brevity, I'm not including all the models for each tab */}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">Seamless Integration with Your Workflow</h3>
            <p className="text-white/70">
              Mindscape Analytics provides enterprise-grade infrastructure to deploy, monitor, and scale open-source
              models in production environments. Our platform handles the complexity of model deployment, allowing your
              team to focus on innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-500/10 rounded-full mb-4">
                    <Brain className="h-6 w-6 text-red-500" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Model Fine-tuning</h4>
                  <p className="text-white/70 text-sm">
                    Customize open-source models with your own data for domain-specific applications
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-500/10 rounded-full mb-4">
                    <GitMerge className="h-6 w-6 text-red-500" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Model Versioning</h4>
                  <p className="text-white/70 text-sm">
                    Track model versions, experiments, and performance metrics in a centralized repository
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-500/10 rounded-full mb-4">
                    <Code className="h-6 w-6 text-red-500" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">API Access</h4>
                  <p className="text-white/70 text-sm">
                    Access models through standardized APIs with enterprise-grade security and scalability
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Explore Our Model Hub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

