import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Code, 
  CopyIcon, 
  MoveHorizontal, 
  FileJson, 
  GitBranch, 
  Zap, 
  Lock, 
  Play, 
  Plus,
  Save,
  Settings,
  Trash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Contract templates data
const contractTemplates = [
  {
    id: "erc20",
    name: "ERC-20 Token",
    description: "Standard token implementation with customizable parameters",
    complexity: "Basic",
    icon: <FileJson className="h-6 w-6 text-blue-400" />,
    category: "Token"
  },
  {
    id: "erc721",
    name: "ERC-721 NFT",
    description: "Non-fungible token implementation with metadata support",
    complexity: "Intermediate",
    icon: <FileJson className="h-6 w-6 text-purple-400" />,
    category: "NFT"
  },
  {
    id: "dao",
    name: "DAO Governance",
    description: "Decentralized governance system with voting mechanisms",
    complexity: "Advanced",
    icon: <FileJson className="h-6 w-6 text-amber-400" />,
    category: "Governance"
  },
  {
    id: "defi",
    name: "DeFi Protocol",
    description: "Decentralized finance protocol with lending and borrowing",
    complexity: "Advanced",
    icon: <FileJson className="h-6 w-6 text-green-400" />,
    category: "DeFi"
  }
];

// Contract module blocks
const moduleBlocks = [
  {
    id: "access-control",
    name: "Access Control",
    description: "Role-based permissions and authorization",
    icon: <Lock className="h-5 w-5 text-purple-400" />,
    category: "Security"
  },
  {
    id: "upgradeable",
    name: "Upgradeable",
    description: "Proxy pattern for contract upgrades",
    icon: <GitBranch className="h-5 w-5 text-blue-400" />,
    category: "Architecture"
  },
  {
    id: "pausable",
    name: "Pausable",
    description: "Emergency pause functionality",
    icon: <Play className="h-5 w-5 text-amber-400" />,
    category: "Security"
  },
  {
    id: "events",
    name: "Event Emitter",
    description: "Custom event emission with indexing",
    icon: <Zap className="h-5 w-5 text-green-400" />,
    category: "Utility"
  }
];

const SmartContractBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [contractName, setContractName] = useState("MyToken");
  const [tokenSymbol, setTokenSymbol] = useState("MTK");
  const [deploymentNetwork, setDeploymentNetwork] = useState("ethereum");

  const handleAddModule = (moduleId: string) => {
    if (!selectedModules.includes(moduleId)) {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  const handleRemoveModule = (moduleId: string) => {
    setSelectedModules(selectedModules.filter(id => id !== moduleId));
  };

  const getDeploymentNetworkColor = () => {
    switch (deploymentNetwork) {
      case "ethereum": return "text-blue-500";
      case "polygon": return "text-purple-500";
      case "avalanche": return "text-red-500";
      case "solana": return "text-green-500";
      default: return "text-blue-500";
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Left panel - Tools and Components */}
        <div className="w-full md:w-64 bg-black/50 border-r border-white/10">
          <Tabs defaultValue="templates" className="w-full" onValueChange={setActiveTab}>
            <div className="p-4 border-b border-white/10">
              <TabsList className="grid grid-cols-2 w-full bg-black/30">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="templates" className="p-4 space-y-4 h-[600px] overflow-y-auto">
              <h3 className="text-sm font-medium text-white/70">Contract Templates</h3>
              {contractTemplates.map((template) => (
                <motion.div 
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? "bg-blue-900/30 border border-blue-500/50" 
                      : "bg-black/30 border border-white/5 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center gap-3">
                    {template.icon}
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-xs text-white/70">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-white/70">{template.complexity}</span>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="modules" className="p-4 space-y-4 h-[600px] overflow-y-auto">
              <h3 className="text-sm font-medium text-white/70">Contract Modules</h3>
              {moduleBlocks.map((module) => (
                <motion.div 
                  key={module.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 cursor-pointer"
                  onClick={() => handleAddModule(module.id)}
                >
                  <div className="flex items-center gap-3">
                    {module.icon}
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <p className="text-xs text-white/70">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {module.category}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-blue-500/20 hover:text-blue-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddModule(module.id);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Main builder area */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Smart Contract Builder</h2>
              <p className="text-sm text-white/70">Visually compose your contract and deploy</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 border-white/10">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {selectedTemplate ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-medium mb-3">Contract Configuration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/70 mb-1 block">Contract Name</label>
                        <input 
                          type="text" 
                          value={contractName} 
                          onChange={(e) => setContractName(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/70 mb-1 block">Token Symbol</label>
                        <input 
                          type="text" 
                          value={tokenSymbol} 
                          onChange={(e) => setTokenSymbol(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/70 mb-1 block">Deployment Network</label>
                        <select 
                          value={deploymentNetwork}
                          onChange={(e) => setDeploymentNetwork(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                        >
                          <option value="ethereum">Ethereum</option>
                          <option value="polygon">Polygon</option>
                          <option value="avalanche">Avalanche</option>
                          <option value="solana">Solana</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/70 mb-1 block">Initial Supply</label>
                        <input 
                          type="text" 
                          defaultValue="1000000" 
                          className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium">Added Modules</h3>
                      <Badge variant="outline" className={`text-xs ${selectedModules.length > 0 ? "border-green-500/30 text-green-400" : "border-white/30"}`}>
                        {selectedModules.length} modules
                      </Badge>
                    </div>
                    
                    {selectedModules.length === 0 ? (
                      <div className="flex items-center justify-center p-6 border border-dashed border-white/10 rounded-lg bg-black/20">
                        <div className="text-center">
                          <MoveHorizontal className="h-8 w-8 text-white/30 mx-auto mb-2" />
                          <p className="text-sm text-white/50">Drag modules or click Add from the modules panel</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedModules.map(moduleId => {
                          const module = moduleBlocks.find(m => m.id === moduleId);
                          if (!module) return null;
                          
                          return (
                            <div key={moduleId} className="flex items-center justify-between p-2 bg-black/50 rounded-lg border border-white/10">
                              <div className="flex items-center gap-2">
                                {module.icon}
                                <span>{module.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6 rounded-full hover:bg-red-500/20 hover:text-red-400"
                                onClick={() => handleRemoveModule(moduleId)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-medium mb-3">Contract Preview</h3>
                    <div className="bg-black/70 rounded-lg p-3 font-mono text-xs text-white/90 overflow-hidden">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                        <span className="text-blue-400">// {contractName}.sol</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-blue-500/20">
                          <CopyIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div><span className="text-purple-400">pragma</span> <span className="text-blue-400">solidity</span> ^0.8.17;</div>
                        <div></div>
                        <div><span className="text-green-400">import</span> <span className="text-amber-400">"@openzeppelin/contracts/token/ERC20/ERC20.sol"</span>;</div>
                        {selectedModules.includes('access-control') && (
                          <div><span className="text-green-400">import</span> <span className="text-amber-400">"@openzeppelin/contracts/access/AccessControl.sol"</span>;</div>
                        )}
                        {selectedModules.includes('pausable') && (
                          <div><span className="text-green-400">import</span> <span className="text-amber-400">"@openzeppelin/contracts/security/Pausable.sol"</span>;</div>
                        )}
                        {selectedModules.includes('upgradeable') && (
                          <div><span className="text-green-400">import</span> <span className="text-amber-400">"@openzeppelin/contracts/proxy/utils/Initializable.sol"</span>;</div>
                        )}
                        <div></div>
                        <div>
                          <span className="text-purple-400">contract</span> <span className="text-blue-400">{contractName}</span> <span className="text-purple-400">is</span> <span className="text-blue-400">ERC20</span>
                          {selectedModules.includes('access-control') && <span>, <span className="text-blue-400">AccessControl</span></span>}
                          {selectedModules.includes('pausable') && <span>, <span className="text-blue-400">Pausable</span></span>}
                          {selectedModules.includes('upgradeable') && <span>, <span className="text-blue-400">Initializable</span></span>}
                          <span> {`{`}</span>
                        </div>
                        <div>    <span className="text-green-400">// Constructor</span></div>
                        <div>    <span className="text-purple-400">constructor</span>() <span className="text-blue-400">ERC20</span>(<span className="text-amber-400">"{contractName}"</span>, <span className="text-amber-400">"{tokenSymbol}"</span>) {`{`}</div>
                        <div>        _mint(<span className="text-blue-400">msg.sender</span>, 1000000 * 10 ** 18);</div>
                        <div>    {`}`}</div>
                        <div></div>
                        {selectedModules.includes('events') && (
                          <>
                            <div>    <span className="text-green-400">// Custom events</span></div>
                            <div>    <span className="text-purple-400">event</span> <span className="text-blue-400">TokensLocked</span>(address indexed owner, uint256 amount);</div>
                            <div></div>
                          </>
                        )}
                        <div>    <span className="text-green-400">// More code here based on selected modules...</span></div>
                        <div>{`}`}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-medium mb-3">Deployment</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`text-sm font-medium ${getDeploymentNetworkColor()}`}>
                        Deploy to: {deploymentNetwork.charAt(0).toUpperCase() + deploymentNetwork.slice(1)}
                      </div>
                      <Badge variant="outline" className="border-white/10 text-white/70 text-xs">
                        Testnet
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Code className="mr-2 h-4 w-4" />
                      Compile & Deploy
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                <h3 className="text-sm font-medium mb-3">Deployment History</h3>
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-black/40">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70">Contract</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70">Network</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70">Address</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70">Date</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-black/20">
                      <tr>
                        <td className="px-4 py-2 text-sm">MindToken</td>
                        <td className="px-4 py-2 text-sm">Ethereum Goerli</td>
                        <td className="px-4 py-2 text-sm font-mono">0x1a2b...3c4d</td>
                        <td className="px-4 py-2 text-sm">2023-10-15</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">DataToken</td>
                        <td className="px-4 py-2 text-sm">Polygon Mumbai</td>
                        <td className="px-4 py-2 text-sm font-mono">0x5e6f...7g8h</td>
                        <td className="px-4 py-2 text-sm">2023-10-10</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[600px] border border-dashed border-white/10 rounded-xl bg-black/20">
              <div className="text-center max-w-md p-6">
                <FileJson className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Contract Template</h3>
                <p className="text-white/70 mb-6">
                  Choose a template from the left panel to start building your smart contract
                </p>
                <Button onClick={() => setActiveTab("templates")} variant="outline">
                  Browse Templates
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartContractBuilder; 