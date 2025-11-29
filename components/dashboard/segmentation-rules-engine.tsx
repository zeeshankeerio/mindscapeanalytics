"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Filter,
  Undo,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

// Types
export interface SegmentationRule {
  id: string;
  field: string;
  operator: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'date';
}

export interface SegmentationRuleGroup {
  id: string;
  rules: SegmentationRule[];
  combinator: 'and' | 'or';
  parentId?: string;
  groups?: SegmentationRuleGroup[];
}

export interface SegmentationCondition {
  id: string;
  name: string;
  description: string;
  rootGroup: SegmentationRuleGroup;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SegmentationRulesEngineProps {
  onRulesChange?: (rules: SegmentationCondition[]) => void;
  initialConditions?: SegmentationCondition[];
  showColorfulUI?: boolean;
  animationsEnabled?: boolean;
}

// Field options organized by category
const fieldOptions = [
  {
    category: "Demographics",
    fields: [
      { id: "age", name: "Age", type: "number" },
      { id: "gender", name: "Gender", type: "string" },
      { id: "location", name: "Location", type: "string" },
      { id: "language", name: "Language", type: "string" },
    ]
  },
  {
    category: "Behavior",
    fields: [
      { id: "session_count", name: "Session Count", type: "number" },
      { id: "avg_session_duration", name: "Avg Session Duration", type: "number" },
      { id: "last_active", name: "Last Active", type: "date" },
      { id: "feature_usage", name: "Feature Usage", type: "string" },
    ]
  },
  {
    category: "Transactions",
    fields: [
      { id: "total_spend", name: "Total Spend", type: "number" },
      { id: "avg_order_value", name: "Avg Order Value", type: "number" },
      { id: "purchase_frequency", name: "Purchase Frequency", type: "number" },
      { id: "last_purchase", name: "Last Purchase", type: "date" },
    ]
  },
  {
    category: "Engagement",
    fields: [
      { id: "email_open_rate", name: "Email Open Rate", type: "number" },
      { id: "click_through_rate", name: "Click Through Rate", type: "number" },
      { id: "nps_score", name: "NPS Score", type: "number" },
      { id: "is_subscribed", name: "Is Subscribed", type: "boolean" },
    ]
  }
];

// Operator options by field type
const operatorOptions = {
  string: [
    { id: "equals", name: "Equals" },
    { id: "contains", name: "Contains" },
    { id: "starts_with", name: "Starts with" },
    { id: "ends_with", name: "Ends with" },
    { id: "in", name: "In list" },
  ],
  number: [
    { id: "equals", name: "Equals" },
    { id: "greater_than", name: "Greater than" },
    { id: "less_than", name: "Less than" },
    { id: "between", name: "Between" },
  ],
  boolean: [
    { id: "equals", name: "Equals" },
  ],
  date: [
    { id: "equals", name: "Equals" },
    { id: "before", name: "Before" },
    { id: "after", name: "After" },
    { id: "between", name: "Between" },
    { id: "in_the_last", name: "In the last" },
  ],
};

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Create a new rule
const createRule = (): SegmentationRule => ({
  id: generateId(),
  field: "",
  operator: "",
  value: "",
  type: "string",
});

// Create a new rule group
const createRuleGroup = (parentId?: string): SegmentationRuleGroup => ({
  id: generateId(),
  rules: [createRule()],
  combinator: "and",
  parentId,
  groups: [],
});

// Create a new condition
const createCondition = (): SegmentationCondition => ({
  id: generateId(),
  name: "New Segment",
  description: "Segment description",
  rootGroup: createRuleGroup(),
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Field selector component
const FieldSelector = ({ 
  value, 
  onChange, 
  showColorfulUI = false 
}: { 
  value: string; 
  onChange: (value: string, type: string) => void; 
  showColorfulUI?: boolean;
}) => {
  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        // Find the field to get its type
        let fieldType = "string";
        for (const category of fieldOptions) {
          const field = category.fields.find(f => f.id === newValue);
          if (field) {
            fieldType = field.type;
            break;
          }
        }
        onChange(newValue, fieldType);
      }}
    >
      <SelectTrigger className={`w-full ${showColorfulUI ? "bg-white/10 border-white/20 text-white" : ""}`}>
        <SelectValue placeholder="Select field" />
      </SelectTrigger>
      <SelectContent>
        {fieldOptions.map((category) => (
          <div key={category.category}>
            <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5">
              {category.category}
            </div>
            {category.fields.map((field) => (
              <SelectItem key={field.id} value={field.id}>
                {field.name}
              </SelectItem>
            ))}
            <Separator className="my-1" />
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

// Operator selector component
const OperatorSelector = ({ 
  value, 
  fieldType, 
  onChange, 
  showColorfulUI = false 
}: { 
  value: string; 
  fieldType: string; 
  onChange: (value: string) => void; 
  showColorfulUI?: boolean;
}) => {
  const options = operatorOptions[fieldType as keyof typeof operatorOptions] || operatorOptions.string;
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-full ${showColorfulUI ? "bg-white/10 border-white/20 text-white" : ""}`}>
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {options.map((op) => (
          <SelectItem key={op.id} value={op.id}>
            {op.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Rule component
const Rule = ({ 
  rule, 
  onUpdate, 
  onDelete, 
  showColorfulUI = false,
  isLast = false,
  ruleCount = 1,
}: { 
  rule: SegmentationRule; 
  onUpdate: (rule: SegmentationRule) => void; 
  onDelete: () => void; 
  showColorfulUI?: boolean;
  isLast?: boolean;
  ruleCount?: number;
}) => {
  const handleFieldChange = (field: string, type: string) => {
    onUpdate({ ...rule, field, type: type as 'string' | 'number' | 'boolean' | 'date' });
  };

  const handleOperatorChange = (operator: string) => {
    onUpdate({ ...rule, operator });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = rule.type === 'number' ? Number(e.target.value) : e.target.value;
    onUpdate({ ...rule, value });
  };

  const handleBooleanValueChange = (checked: boolean) => {
    onUpdate({ ...rule, value: checked });
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-start">
      <div className="w-full md:w-1/3">
        <FieldSelector 
          value={rule.field} 
          onChange={handleFieldChange} 
          showColorfulUI={showColorfulUI}
        />
      </div>
      <div className="w-full md:w-1/4">
        <OperatorSelector 
          value={rule.operator} 
          fieldType={rule.type} 
          onChange={handleOperatorChange} 
          showColorfulUI={showColorfulUI}
        />
      </div>
      <div className="w-full md:w-1/3">
        {rule.type === 'boolean' ? (
          <div className="flex items-center h-10 space-x-2">
            <Switch 
              checked={rule.value as boolean} 
              onCheckedChange={handleBooleanValueChange} 
            />
            <Label>{rule.value ? 'True' : 'False'}</Label>
          </div>
        ) : (
          <Input 
            type={rule.type === 'number' ? 'number' : rule.type === 'date' ? 'date' : 'text'} 
            placeholder="Value" 
            value={rule.value as string} 
            onChange={handleValueChange}
            className={showColorfulUI ? "bg-white/10 border-white/20 text-white" : ""}
          />
        )}
      </div>
      <div className="w-full md:w-auto flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onDelete} 
                disabled={ruleCount === 1 && isLast}
                className={showColorfulUI ? "text-white hover:bg-white/10" : ""}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove this rule</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

// Rule Group component
const RuleGroup = ({ 
  group, 
  onUpdate, 
  onDelete, 
  depth = 0, 
  showColorfulUI = false,
  animationsEnabled = false,
  maxDepth = 3,
}: { 
  group: SegmentationRuleGroup; 
  onUpdate: (group: SegmentationRuleGroup) => void; 
  onDelete?: () => void; 
  depth?: number;
  showColorfulUI?: boolean;
  animationsEnabled?: boolean;
  maxDepth?: number;
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleCombinatorChange = (combinator: 'and' | 'or') => {
    onUpdate({ ...group, combinator });
  };

  const handleRuleUpdate = (index: number, rule: SegmentationRule) => {
    const updatedRules = [...group.rules];
    updatedRules[index] = rule;
    onUpdate({ ...group, rules: updatedRules });
  };

  const handleRuleDelete = (index: number) => {
    const updatedRules = [...group.rules];
    updatedRules.splice(index, 1);
    onUpdate({ ...group, rules: updatedRules });
  };

  const handleAddRule = () => {
    onUpdate({ ...group, rules: [...group.rules, createRule()] });
  };

  const handleAddGroup = () => {
    const newGroups = [...(group.groups || []), createRuleGroup(group.id)];
    onUpdate({ ...group, groups: newGroups });
  };

  const handleGroupUpdate = (index: number, updatedGroup: SegmentationRuleGroup) => {
    const updatedGroups = [...(group.groups || [])];
    updatedGroups[index] = updatedGroup;
    onUpdate({ ...group, groups: updatedGroups });
  };

  const handleGroupDelete = (index: number) => {
    const updatedGroups = [...(group.groups || [])];
    updatedGroups.splice(index, 1);
    onUpdate({ ...group, groups: updatedGroups });
  };

  // Determine colors based on nesting level for visual clarity
  const getBorderColor = () => {
    if (!showColorfulUI) return "border-border";
    
    const colors = [
      "border-blue-500",
      "border-purple-500",
      "border-green-500",
      "border-amber-500",
    ];
    
    return colors[depth % colors.length];
  };

  return (
    <motion.div 
      initial={animationsEnabled ? { opacity: 0, y: 10 } : undefined}
      animate={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
      className={`rounded-md border p-4 mb-4 ${getBorderColor()}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          
          <div className="flex items-center ml-1">
            <Badge 
              variant={showColorfulUI ? "default" : "outline"}
              className={showColorfulUI ? `bg-${depth === 0 ? 'blue' : depth === 1 ? 'purple' : depth === 2 ? 'green' : 'amber'}-500/80` : ""}
            >
              Group
            </Badge>
            
            <Select 
              value={group.combinator} 
              onValueChange={(value) => handleCombinatorChange(value as 'and' | 'or')}
            >
              <SelectTrigger className="w-20 h-8 ml-2 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="and">AND</SelectItem>
                <SelectItem value="or">OR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {onDelete && depth > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete}
            className={showColorfulUI ? "text-white hover:bg-white/10" : ""}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {expanded && (
        <div className="space-y-3 pl-2">
          <AnimatePresence>
            {group.rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={animationsEnabled ? { opacity: 0, height: 0 } : undefined}
                animate={animationsEnabled ? { opacity: 1, height: 'auto' } : undefined}
                exit={animationsEnabled ? { opacity: 0, height: 0 } : undefined}
                transition={{ duration: 0.2 }}
              >
                <Rule 
                  rule={rule} 
                  onUpdate={(updatedRule) => handleRuleUpdate(index, updatedRule)} 
                  onDelete={() => handleRuleDelete(index)}
                  showColorfulUI={showColorfulUI}
                  isLast={index === group.rules.length - 1}
                  ruleCount={group.rules.length}
                />
                {index < group.rules.length - 1 && (
                  <div className="my-2 ml-2">
                    <Badge variant="outline" className="text-xs">
                      {group.combinator === 'and' ? 'AND' : 'OR'}
                    </Badge>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {group.groups && group.groups.length > 0 && (
            <div className="mt-4 space-y-4">
              {group.rules.length > 0 && (
                <div className="my-2 ml-2">
                  <Badge variant="outline" className="text-xs">
                    {group.combinator === 'and' ? 'AND' : 'OR'}
                  </Badge>
                </div>
              )}
              
              {group.groups.map((nestedGroup, index) => (
                <motion.div
                  key={nestedGroup.id}
                  initial={animationsEnabled ? { opacity: 0, height: 0 } : undefined}
                  animate={animationsEnabled ? { opacity: 1, height: 'auto' } : undefined}
                  exit={animationsEnabled ? { opacity: 0, height: 0 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <RuleGroup
                    group={nestedGroup}
                    onUpdate={(updatedGroup) => handleGroupUpdate(index, updatedGroup)}
                    onDelete={() => handleGroupDelete(index)}
                    depth={depth + 1}
                    showColorfulUI={showColorfulUI}
                    animationsEnabled={animationsEnabled}
                    maxDepth={maxDepth}
                  />
                  {group.groups && index < group.groups.length - 1 && (
                    <div className="my-2 ml-2">
                      <Badge variant="outline" className="text-xs">
                        {group.combinator === 'and' ? 'AND' : 'OR'}
                      </Badge>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddRule}
              className="text-xs"
            >
              <Plus className="h-3 w-3 mr-1" /> Add Rule
            </Button>
            
            {depth < maxDepth && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddGroup}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" /> Add Group
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Condition component
const SegmentationCondition = ({
  condition,
  onUpdate,
  onDelete,
  showColorfulUI = false,
  animationsEnabled = false,
}: {
  condition: SegmentationCondition;
  onUpdate: (condition: SegmentationCondition) => void;
  onDelete: () => void;
  showColorfulUI?: boolean;
  animationsEnabled?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(condition.name);
  const [editDescription, setEditDescription] = useState(condition.description);
  
  const handleSaveMetadata = () => {
    onUpdate({
      ...condition,
      name: editName,
      description: editDescription,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };
  
  const handleGroupUpdate = (rootGroup: SegmentationRuleGroup) => {
    onUpdate({
      ...condition,
      rootGroup,
      updatedAt: new Date().toISOString(),
    });
  };
  
  const handleActiveChange = (active: boolean) => {
    onUpdate({
      ...condition,
      isActive: active,
      updatedAt: new Date().toISOString(),
    });
  };
  
  return (
    <motion.div
      initial={animationsEnabled ? { opacity: 0, scale: 0.98 } : undefined}
      animate={animationsEnabled ? { opacity: 1, scale: 1 } : undefined}
      className={`border rounded-md mb-6 overflow-hidden ${
        showColorfulUI
          ? condition.isActive
            ? "border-green-500/50"
            : "border-muted/50"
          : ""
      }`}
    >
      <div className={`p-4 ${showColorfulUI ? (condition.isActive ? "bg-green-500/10" : "bg-muted/10") : "bg-muted/5"}`}>
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor="segment-name" className="text-sm font-medium">Segment Name</Label>
              <Input
                id="segment-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="segment-description" className="text-sm font-medium">Description</Label>
              <Input
                id="segment-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveMetadata}>
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                setEditName(condition.name);
                setEditDescription(condition.description);
                setIsEditing(false);
              }}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{condition.name}</h3>
                <Badge variant={condition.isActive ? "default" : "outline"}>
                  {condition.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setIsEditing(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </Button>
              </div>
              {condition.description && (
                <p className="text-sm text-muted-foreground mt-1">{condition.description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 mr-4">
                <Label htmlFor={`active-${condition.id}`} className="text-sm">Active</Label>
                <Switch
                  id={`active-${condition.id}`}
                  checked={condition.isActive}
                  onCheckedChange={handleActiveChange}
                />
              </div>
              
              <Button variant="ghost" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <RuleGroup
          group={condition.rootGroup}
          onUpdate={handleGroupUpdate}
          showColorfulUI={showColorfulUI}
          animationsEnabled={animationsEnabled}
        />
      </div>
    </motion.div>
  );
};

export function SegmentationRulesEngine({
  onRulesChange,
  initialConditions,
  showColorfulUI = false,
  animationsEnabled = false,
}: SegmentationRulesEngineProps) {
  const [conditions, setConditions] = useState<SegmentationCondition[]>(
    initialConditions || [createCondition()]
  );

  // Notify parent component when rules change
  useEffect(() => {
    if (onRulesChange) {
      onRulesChange(conditions);
    }
  }, [conditions, onRulesChange]);

  const handleAddCondition = () => {
    setConditions([...conditions, createCondition()]);
  };

  const handleConditionUpdate = (index: number, updatedCondition: SegmentationCondition) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = updatedCondition;
    setConditions(updatedConditions);
  };

  const handleConditionDelete = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  const getTotalRulesCount = () => {
    let count = 0;
    
    // Recursive function to count rules in groups
    const countRulesInGroup = (group: SegmentationRuleGroup) => {
      count += group.rules.length;
      
      if (group.groups && group.groups.length > 0) {
        group.groups.forEach(nestedGroup => {
          countRulesInGroup(nestedGroup);
        });
      }
    };
    
    // Count rules in each condition
    conditions.forEach(condition => {
      countRulesInGroup(condition.rootGroup);
    });
    
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-xl font-semibold ${showColorfulUI ? "text-white" : ""}`}>Segmentation Rules Engine</h2>
          <p className={`text-sm ${showColorfulUI ? "text-white/70" : "text-muted-foreground"}`}>
            Build complex segmentation criteria with AND/OR logic
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`text-sm ${showColorfulUI ? "text-white/70" : "text-muted-foreground"}`}>
            <Badge variant="outline" className="mr-1">{conditions.length}</Badge> 
            {conditions.length === 1 ? 'Segment' : 'Segments'} with 
            <Badge variant="outline" className="mx-1">{getTotalRulesCount()}</Badge> 
            {getTotalRulesCount() === 1 ? 'rule' : 'rules'}
          </div>
          
          <Button onClick={handleAddCondition}>
            <Plus className="h-4 w-4 mr-2" /> Add Segment
          </Button>
        </div>
      </div>
      
      {conditions.length === 0 ? (
        <Card className={`p-12 text-center ${showColorfulUI ? "bg-slate-800/70 text-white border-slate-700" : ""}`}>
          <div className="max-w-md mx-auto">
            <Filter className={`h-12 w-12 mx-auto mb-4 ${showColorfulUI ? "text-indigo-400" : "text-muted-foreground"}`} />
            <h3 className="text-xl font-medium mb-2">No Segmentation Rules Defined</h3>
            <p className={`mb-6 ${showColorfulUI ? "text-white/70" : "text-muted-foreground"}`}>
              Create your first segment by defining rules based on user properties, behaviors, or engagement.
            </p>
            <Button onClick={handleAddCondition}>
              <Plus className="h-4 w-4 mr-2" /> Create First Segment
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {conditions.map((condition, index) => (
              <SegmentationCondition
                key={condition.id}
                condition={condition}
                onUpdate={(updatedCondition) => handleConditionUpdate(index, updatedCondition)}
                onDelete={() => handleConditionDelete(index)}
                showColorfulUI={showColorfulUI}
                animationsEnabled={animationsEnabled}
              />
            ))}
          </AnimatePresence>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={() => console.log(JSON.stringify(conditions, null, 2))}
              className="flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" /> Preview JSON
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" /> Save Rules
              </Button>
              <Button>
                <Check className="h-4 w-4 mr-2" /> Apply Rules
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 