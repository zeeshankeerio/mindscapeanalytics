'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Building, 
  BarChart3, 
  Download, 
  Info, 
  ArrowUpRight, 
  ChevronDown, 
  Map,
  TrendingUp,
  Eye,
  EyeOff,
  Brain, 
  Check,
  AlertTriangle,
  BarChart,
  Calendar,
  DollarSign,
  LineChart,
  PieChart,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// UAE Predictive Market Analytics Dashboard
export function PredictiveAnalytics() {
  // Core state
  const [activeArea, setActiveArea] = useState('Dubai Marina');
  const [activePeriod, setActivePeriod] = useState('1 Year');
  const [activeView, setActiveView] = useState<'heatmap' | 'chart' | 'forecast' | 'advanced'>('forecast');
  const [confidenceInterval, setConfidenceInterval] = useState(80);
  const [forecastModel, setForecastModel] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [riskAdjusted, setRiskAdjusted] = useState(true);
  
  // Enhanced analytics state
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'mixed'>('residential');
  const [subPropertyType, setSubPropertyType] = useState('Apartment');
  const [marketFactors, setMarketFactors] = useState<string[]>(['population', 'gdp', 'tourism']);
  const [comparisonAreas, setComparisonAreas] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');
  const [dataTimeframe, setDataTimeframe] = useState<'historical' | 'current' | 'projected'>('projected');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [showAllData, setShowAllData] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [scenarioAnalysis, setScenarioAnalysis] = useState(false);
  
  // New advanced analytics state
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['appreciation', 'rental', 'risk']);
  const [forecastHorizon, setForecastHorizon] = useState<'short' | 'medium' | 'long'>('medium');
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentGoal, setInvestmentGoal] = useState<'capital_growth' | 'income' | 'balanced'>('balanced');
  const [inflationAssumption, setInflationAssumption] = useState(2.5);
  const [interestRateAssumption, setInterestRateAssumption] = useState(4.0);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [comparePastForecasts, setComparePastForecasts] = useState(false);
  const [taxConsiderations, setTaxConsiderations] = useState(true);
  
  // Time periods for forecasting
  const periods = ['1 Year', '3 Years', '5 Years', '10 Years'];
  
  // Areas in Dubai for analysis
  const areas = [
    'Dubai Marina', 
    'Downtown Dubai', 
    'Palm Jumeirah', 
    'Dubai Hills Estate', 
    'Business Bay',
    'Jumeirah Lake Towers',
    'Arabian Ranches'
  ];
  
  // Abu Dhabi areas
  const abuDhabiAreas = [
    'Al Reem Island',
    'Saadiyat Island',
    'Yas Island',
    'Al Raha Beach',
    'Masdar City'
  ];
  
  // Sharjah areas
  const sharjahAreas = [
    'Al Majaz',
    'Al Khan',
    'Muwaileh'
  ];
  
  // Property types for more granular analysis
  const propertySubTypes = {
    residential: [
      'Apartment', 
      'Villa', 
      'Townhouse', 
      'Penthouse',
      'Studio'
    ],
    commercial: [
      'Office Space', 
      'Retail', 
      'Industrial',
      'Warehouse',
      'Mixed-Use Building'
    ],
    mixed: [
      'Residential Complex',
      'Mixed Development',
      'Urban Community',
      'Planned District'
    ]
  };
  
  // Enhanced area metrics for comprehensive market analysis
  const areaMetrics: Record<string, {
    appreciation: {current: number, historical: {[key: string]: number}, forecast: {[key: string]: number}}
    rental: {current: number, historical: {[key: string]: number}, forecast: {[key: string]: number}}
    risk: {value: string, score: number, factors: string[]}
    stability: number
    supplyDemand: {ratio: number, forecast: {[key: string]: number}}
    transactionVolume: {value: number, trend: 'up' | 'down' | 'stable', percentage: number}
    pricePerSqFt: {value: number, trend: 'up' | 'down' | 'stable', percentage: number, forecast: {[key: string]: number}}
    marketCycle: 'expansion' | 'peak' | 'contraction' | 'trough' | 'recovery'
    investorDemographics: {local: number, international: number, topCountries: string[]}
    macroIndicators: {gdpImpact: number, populationGrowth: number, tourismEffect: number, infrastructureScore: number}
    confidenceScores: {forecastAccuracy: number, dataDensity: number, marketPredictability: number}
    volatility: number
    seasonality: {q1: number, q2: number, q3: number, q4: number}
    affordabilityIndex: number
    priceToIncomeRatio: number
    regulatoryRisk: {score: number, trends: 'increasing' | 'decreasing' | 'stable'}
    luxurySegment: {premium: number, growth: number}
    affordableSegment: {discount: number, growth: number}
  }> = {
    'Dubai Marina': {
      appreciation: {
        current: 8.5,
        historical: {
          '2019': 3.2, '2020': -2.1, '2021': 6.7, '2022': 10.3, '2023': 9.8
        },
        forecast: {
          '2024': 8.5, '2025': 7.9, '2026': 7.4, '2027': 6.8, '2028': 6.5
        }
      },
      rental: {
        current: 6.2,
        historical: {
          '2019': 5.1, '2020': 4.2, '2021': 5.3, '2022': 6.8, '2023': 6.4
        },
        forecast: {
          '2024': 6.2, '2025': 6.4, '2026': 6.5, '2027': 6.3, '2028': 6.1
        }
      },
      risk: {
        value: 'Low',
        score: 25,
        factors: ['High liquidity', 'Strong tourist demand', 'Established area']
      },
      stability: 88,
      supplyDemand: {
        ratio: 1.13,
        forecast: {
          '2024': 1.13, '2025': 1.08, '2026': 1.05, '2027': 1.02, '2028': 1.00
        }
      },
      transactionVolume: {value: 1865, trend: 'up', percentage: 12},
      pricePerSqFt: {
        value: 1450, 
        trend: 'up', 
        percentage: 8,
        forecast: {
          '2024': 1450, '2025': 1565, '2026': 1680, '2027': 1795, '2028': 1910
        }
      },
      marketCycle: 'expansion',
      investorDemographics: {
        local: 35,
        international: 65,
        topCountries: ['UK', 'Russia', 'India', 'China', 'Saudi Arabia']
      },
      macroIndicators: {
        gdpImpact: 0.85,
        populationGrowth: 3.2,
        tourismEffect: 0.95,
        infrastructureScore: 90
      },
      confidenceScores: {
        forecastAccuracy: 85,
        dataDensity: 92,
        marketPredictability: 78
      },
      volatility: 15,
      seasonality: {q1: 1.2, q2: 0.8, q3: 0.7, q4: 1.3},
      affordabilityIndex: 65,
      priceToIncomeRatio: 7.8,
      regulatoryRisk: {score: 20, trends: 'stable'},
      luxurySegment: {premium: 35, growth: 12},
      affordableSegment: {discount: -15, growth: 5}
    }
  };
  
  // Add placeholder data for other areas
  [...areas, ...abuDhabiAreas, ...sharjahAreas].forEach(area => {
    if (!areaMetrics[area]) {
      areaMetrics[area] = {
        appreciation: {
          current: 7.5,
          historical: {
            '2019': 2.0, '2020': -1.0, '2021': 5.5, '2022': 8.5, '2023': 8.0
          },
          forecast: {
            '2024': 7.5, '2025': 7.0, '2026': 6.5, '2027': 6.0, '2028': 5.5
          }
        },
        rental: {
          current: 5.5,
          historical: {
            '2019': 4.5, '2020': 4.0, '2021': 4.8, '2022': 5.5, '2023': 5.5
          },
          forecast: {
            '2024': 5.5, '2025': 5.7, '2026': 5.8, '2027': 5.6, '2028': 5.4
          }
        },
        risk: {
          value: 'Medium',
          score: 40,
          factors: ['Moderate liquidity', 'Average demand', 'Developing area']
        },
        stability: 75,
        supplyDemand: {
          ratio: 1.0,
          forecast: {
            '2024': 1.0, '2025': 1.02, '2026': 1.04, '2027': 1.05, '2028': 1.03
          }
        },
        transactionVolume: {value: 1200, trend: 'stable', percentage: 2},
        pricePerSqFt: {
          value: 1100, 
          trend: 'stable', 
          percentage: 3,
          forecast: {
            '2024': 1100, '2025': 1133, '2026': 1167, '2027': 1202, '2028': 1238
          }
        },
        marketCycle: 'expansion',
        investorDemographics: {
          local: 50,
          international: 50,
          topCountries: ['India', 'Pakistan', 'UK', 'Egypt', 'Saudi Arabia']
        },
        macroIndicators: {
          gdpImpact: 0.7,
          populationGrowth: 3.0,
          tourismEffect: 0.7,
          infrastructureScore: 80
        },
        confidenceScores: {
          forecastAccuracy: 75,
          dataDensity: 80,
          marketPredictability: 70
        },
        volatility: 25,
        seasonality: {q1: 1.1, q2: 0.9, q3: 0.8, q4: 1.2},
        affordabilityIndex: 75,
        priceToIncomeRatio: 6.5,
        regulatoryRisk: {score: 35, trends: 'decreasing'},
        luxurySegment: {premium: 25, growth: 8},
        affordableSegment: {discount: -20, growth: 10}
      };
    }
  });
  
  // Expanded market trends with more comprehensive data
  const marketTrends = {
    price_growth: [3.5, 2.8, -1.5, 5.2, 8.5, 10.2, 9.5, 8.8, 8.2, 7.5],
    transaction_volume: [950, 880, 750, 920, 1150, 1350, 1420, 1520, 1480, 1550],
    supply_pipeline: [620, 580, 480, 350, 540, 680, 730, 780, 850, 920],
    foreign_investment: [280, 310, 250, 320, 420, 520, 570, 620, 640, 650],
    mortgage_rates: [3.2, 3.5, 3.8, 3.9, 4.2, 4.5, 4.7, 4.6, 4.5, 4.3],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  };
  
  // Enhanced UAE Economic factors
  const economicFactors = {
    gdp_growth: 3.2,
    inflation: 2.5,
    population_growth: 1.5,
    tourism_growth: 15.2,
    foreign_direct_investment: 8.5,
    unemployment: 2.8,
    government_spending: 5.1,
    construction_sector_growth: 4.3,
    oil_price_impact: 2.1,
    interest_rate_trend: -0.3,
    fiscal_policies: 'expansionary',
    monetary_stability: 'strong',
    regulatory_environment: 'improving'
  };
  
  // Get number of years from the selected period, considering forecast horizon
  const getYearsFromPeriod = () => {
    // Base years from period selection
    let baseYears = 0;
    if (activePeriod === '1 Year') baseYears = 1;
    if (activePeriod === '3 Years') baseYears = 3;
    if (activePeriod === '5 Years') baseYears = 5;
    if (activePeriod === '10 Years') baseYears = 10;
    
    // Apply horizon multiplier
    if (forecastHorizon === 'short') {
      return Math.max(1, Math.floor(baseYears * 0.5));
    } else if (forecastHorizon === 'long') {
      return Math.ceil(baseYears * 1.5);
    }
    
    return baseYears; // 'medium' uses the default period
  };
  
  // Calculate future value based on compound growth with enhanced parameters
  const calculateFutureValue = (currentValue: number, growthRate: number, years: number, options?: {
    inflationAdjusted?: boolean,
    riskAdjusted?: boolean,
    taxConsidered?: boolean,
    interestRateShift?: number
  }) => {
    let adjustedGrowthRate = growthRate;
    
    // Apply inflation adjustment if requested
    if (options?.inflationAdjusted) {
      adjustedGrowthRate -= inflationAssumption;
    }
    
    // Apply interest rate impact if specified
    if (options?.interestRateShift) {
      // Higher interest rates typically reduce real estate appreciation
      adjustedGrowthRate -= options.interestRateShift * 0.5;
    }
    
    // Apply risk adjustment if requested
    if (options?.riskAdjusted) {
      const riskScore = areaMetrics[activeArea].risk.score;
      // Higher risk score means lower appreciation forecast
      const riskMultiplier = 1 - (riskScore / 200);
      adjustedGrowthRate = adjustedGrowthRate * riskMultiplier;
    }
    
    // Calculate compounded future value
    const futureValue = currentValue * Math.pow(1 + (adjustedGrowthRate / 100), years);
    
    // Apply tax consideration if requested
    if (options?.taxConsidered) {
      // Simplified UAE tax impact (minimal at present)
      return futureValue * 0.98;
    }
    
    return futureValue;
  };
  
  // Get the forecasted price for an area with enhanced analytics
  const getForecastedPrice = (area: string) => {
    const years = getYearsFromPeriod();
    const baseAppreciation = areaMetrics[area].appreciation.current;
    
    // Apply model adjustments
    let adjustedRate = baseAppreciation;
    if (forecastModel === 'conservative') {
      adjustedRate = baseAppreciation * 0.8;
    } else if (forecastModel === 'aggressive') {
      adjustedRate = baseAppreciation * 1.2;
    }
    
    const options = {
      inflationAdjusted: true,
      riskAdjusted,
      taxConsidered: taxConsiderations,
      interestRateShift: 0 // Default no shift in interest rates
    };
    
    if (scenarioAnalysis) {
      // Apply interest rate assumptions in scenario analysis
      options.interestRateShift = interestRateAssumption - 4.0; // Relative to baseline of 4%
    }
    
    const futureValue = calculateFutureValue(investmentAmount, adjustedRate, years, options);
    return `AED ${(futureValue / 1000000).toFixed(2)}M`;
  };
  
  // Calculate statistical forecast with confidence intervals and enhanced metrics
  const calculateStatisticalForecast = (area: string, years: number): {
    forecast: number,
    lowerBound: number,
    upperBound: number,
    inflationAdjusted: number,
    volatilityImpact: number
  } => {
    // Base calculation
    const baseAppreciation = areaMetrics[area].appreciation.current;
    
    // Apply forecast model adjustments
    let adjustedAppreciation = baseAppreciation;
    if (forecastModel === 'conservative') {
      adjustedAppreciation = baseAppreciation * 0.8;
    } else if (forecastModel === 'aggressive') {
      adjustedAppreciation = baseAppreciation * 1.2;
    }
    
    // Apply risk adjustment if enabled
    if (riskAdjusted) {
      const riskScore = areaMetrics[area].risk.score;
      // Higher risk score means lower appreciation forecast
      const riskMultiplier = 1 - (riskScore / 200);
      adjustedAppreciation = adjustedAppreciation * riskMultiplier;
    }
    
    // Calculate the forecast
    const forecast = parseFloat((adjustedAppreciation * years).toFixed(1));
    
    // Calculate confidence interval bounds based on area volatility
    const areaVolatility = areaMetrics[area].volatility / 100;
    const confInterval = (100 - confidenceInterval) / 100;
    const confidenceRange = forecast * confInterval * (1 + areaVolatility);
    
    // Inflation-adjusted forecast
    const inflationAdjusted = parseFloat((forecast - (inflationAssumption * years)).toFixed(1));
    
    // Volatility impact (how much volatility could affect returns)
    const volatilityImpact = parseFloat((forecast * areaVolatility).toFixed(1));
    
    return {
      forecast: forecast,
      lowerBound: parseFloat((forecast - confidenceRange).toFixed(1)),
      upperBound: parseFloat((forecast + confidenceRange).toFixed(1)),
      inflationAdjusted: inflationAdjusted,
      volatilityImpact: volatilityImpact
    };
  };
  
  // Enhanced ROI breakdown with compounded returns
  const getROIBreakdown = (area: string) => {
    const appreciationROI = areaMetrics[area].appreciation.current;
    const rentalROI = areaMetrics[area].rental.current;
    const years = getYearsFromPeriod();
    
    const totalROI = appreciationROI + rentalROI;
    const totalROICompounded = ((1 + appreciationROI/100) * Math.pow(1 + rentalROI/100, years) - 1) * 100;
    
    return {
      appreciation: appreciationROI,
      rental: rentalROI,
      total: totalROI,
      compounded: parseFloat(totalROICompounded.toFixed(1))
    };
  };
  
  // Calculate risk-adjusted returns
  const getRiskAdjustedReturns = (area: string) => {
    const roi = getROIBreakdown(area);
    const riskScore = areaMetrics[area].risk.score;
    const riskAdjustmentFactor = 1 - (riskScore / 100);
    
    return {
      nominal: roi.total,
      riskAdjusted: parseFloat((roi.total * riskAdjustmentFactor).toFixed(1)),
      riskPremium: parseFloat((roi.total * (riskScore / 100)).toFixed(1))
    };
  };
  
  // Calculate diversification impact
  const calculateDiversificationImpact = (areas: string[]) => {
    if (areas.length < 2) return { portfolioVolatility: 0, diversificationBenefit: 0 };
    
    // Average volatility of individual areas
    const avgVolatility = areas.reduce((sum, area) => 
      sum + areaMetrics[area].volatility, 0) / areas.length;
    
    // Portfolio volatility (simplified calculation - assumes low correlation)
    const portfolioVolatility = avgVolatility * Math.sqrt(1 / areas.length);
    
    // Diversification benefit (reduction in volatility)
    const diversificationBenefit = avgVolatility - portfolioVolatility;
    
    return {
      portfolioVolatility: parseFloat(portfolioVolatility.toFixed(1)),
      diversificationBenefit: parseFloat(diversificationBenefit.toFixed(1))
    };
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };
  
  // Export report functionality
  const handleExportReport = () => {
    const exportData = {
      area: activeArea,
      period: activePeriod,
      model: forecastModel,
      propertyType: propertyType,
      subType: subPropertyType,
      investmentAmount: investmentAmount,
      forecast: {
        value: getForecastedPrice(activeArea),
        appreciation: areaMetrics[activeArea].appreciation.current,
        rental: areaMetrics[activeArea].rental.current,
        risk: areaMetrics[activeArea].risk.value
      },
      macroIndicators: areaMetrics[activeArea].macroIndicators,
      timestamp: new Date().toISOString()
    };
    
    // Different export formats
    if (exportFormat === 'pdf') {
      alert(`Exporting PDF report for ${activeArea}. In a production environment, this would generate and download a PDF with all forecast data.`);
      console.log('PDF Export Data:', exportData);
      // In a real implementation, we would use a library like jsPDF or call an API endpoint
    } else if (exportFormat === 'csv') {
      // Convert data to CSV format
      const csvContent = Object.entries(exportData.forecast)
        .map(([key, value]) => `${key},${value}`)
        .join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${activeArea}_forecast.csv`);
      link.click();
    } else if (exportFormat === 'excel') {
      alert(`Exporting Excel report for ${activeArea}. In a production environment, this would generate and download an Excel file with all forecast data.`);
      console.log('Excel Export Data:', exportData);
      // In a real implementation, we would use a library like exceljs or call an API endpoint
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header and main controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center">
            UAE Market Analytics
            <Badge className="ml-2 bg-blue-500/20 text-blue-400 font-medium border-none">
              {propertyType === 'residential' ? 'Residential' : propertyType === 'commercial' ? 'Commercial' : 'Mixed Use'}
            </Badge>
            {showAIInsights && (
              <Badge className="ml-2 bg-purple-500/20 text-purple-400 font-medium border-none flex items-center">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Advanced predictive modeling with market-driven metrics</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            className="bg-gray-800 text-sm text-white rounded p-1.5 border-none"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value as 'residential' | 'commercial' | 'mixed')}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed Use</option>
          </select>
          
          <select
            className="bg-gray-800 text-sm text-white rounded p-1.5 border-none"
            value={subPropertyType}
            onChange={(e) => setSubPropertyType(e.target.value)}
          >
            {propertySubTypes[propertyType].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            className="bg-gray-800 text-sm text-white rounded p-1.5 border-none"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'simple' | 'advanced')}
          >
            <option value="simple">Simple View</option>
            <option value="advanced">Advanced Analysis</option>
          </select>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"
            onClick={() => setShowAIInsights(!showAIInsights)}
          >
            {showAIInsights ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {showAIInsights ? 'Hide AI Insights' : 'Show AI Insights'}
          </Button>
        </div>
      </div>
      
      {/* Area selector and visualization controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-1/4 bg-gray-900/40 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Map className="h-4 w-4 mr-1 text-blue-400" />
            Location Analysis
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Primary Location</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-800/80 text-sm text-white rounded py-2 pl-3 pr-8 border-none appearance-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={activeArea}
                  onChange={(e) => setActiveArea(e.target.value)}
                >
                  <optgroup label="Dubai">
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Abu Dhabi">
                    {abuDhabiAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Sharjah">
                    {sharjahAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-blue-400 pointer-events-none" />
                
                {/* Location Badge - Shows selected location's key metric */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Current appreciation:</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-none">
                    +{areaMetrics[activeArea].appreciation.current}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground block mb-1 flex justify-between">
                <span>Comparison Areas</span>
                <span className="text-blue-400">{comparisonAreas.length} selected</span>
              </label>
              <div className="relative">
                <div className="w-full bg-gray-800/80 text-sm text-white rounded p-2 border border-gray-700/50 max-h-[140px] overflow-y-auto">
                  {/* Grouped checkboxes for comparison areas */}
                  <div className="mb-2">
                    <div className="text-xs font-medium text-blue-400 mb-1 pb-1 border-b border-gray-700/50">Dubai</div>
                    {areas.filter(area => area !== activeArea).map((area) => (
                      <div key={area} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={`compare-${area}`}
                          className="h-3 w-3 rounded border-gray-500 text-blue-500 focus:ring-blue-500/50"
                          checked={comparisonAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setComparisonAreas([...comparisonAreas, area]);
                            } else {
                              setComparisonAreas(comparisonAreas.filter(a => a !== area));
                            }
                          }}
                        />
                        <label htmlFor={`compare-${area}`} className="ml-2 text-xs text-white cursor-pointer">
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-xs font-medium text-blue-400 mb-1 pb-1 border-b border-gray-700/50">Abu Dhabi</div>
                    {abuDhabiAreas.filter(area => area !== activeArea).map((area) => (
                      <div key={area} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={`compare-${area}`}
                          className="h-3 w-3 rounded border-gray-500 text-blue-500 focus:ring-blue-500/50"
                          checked={comparisonAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setComparisonAreas([...comparisonAreas, area]);
                            } else {
                              setComparisonAreas(comparisonAreas.filter(a => a !== area));
                            }
                          }}
                        />
                        <label htmlFor={`compare-${area}`} className="ml-2 text-xs text-white cursor-pointer">
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-blue-400 mb-1 pb-1 border-b border-gray-700/50">Sharjah</div>
                    {sharjahAreas.filter(area => area !== activeArea).map((area) => (
                      <div key={area} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={`compare-${area}`}
                          className="h-3 w-3 rounded border-gray-500 text-blue-500 focus:ring-blue-500/50"
                          checked={comparisonAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setComparisonAreas([...comparisonAreas, area]);
                            } else {
                              setComparisonAreas(comparisonAreas.filter(a => a !== area));
                            }
                          }}
                        />
                        <label htmlFor={`compare-${area}`} className="ml-2 text-xs text-white cursor-pointer">
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick actions for comparison selection */}
                <div className="flex justify-between mt-1">
                  <button 
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => setComparisonAreas([])}
                  >
                    Clear all
                  </button>
                  <button
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      // Select top performing areas (3)
                      const allAreas = [...areas, ...abuDhabiAreas, ...sharjahAreas].filter(a => a !== activeArea);
                      const topAreas = allAreas
                        .sort((a, b) => areaMetrics[b].appreciation.current - areaMetrics[a].appreciation.current)
                        .slice(0, 3);
                      setComparisonAreas(topAreas);
                    }}
                  >
                    Top 3 performers
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Forecast Model</label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  className={`px-2 py-1.5 text-xs rounded-md ${
                    forecastModel === 'conservative' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                  }`}
                  onClick={() => setForecastModel('conservative')}
                >
                  Conservative
                </button>
                <button
                  className={`px-2 py-1.5 text-xs rounded-md ${
                    forecastModel === 'moderate' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                  }`}
                  onClick={() => setForecastModel('moderate')}
                >
                  Moderate
                </button>
                <button
                  className={`px-2 py-1.5 text-xs rounded-md ${
                    forecastModel === 'aggressive' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                  }`}
                  onClick={() => setForecastModel('aggressive')}
                >
                  Aggressive
                </button>
              </div>
            </div>
            
            {viewMode === 'advanced' && (
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Forecast Horizon</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    className={`px-2 py-1.5 text-xs rounded-md ${
                      forecastHorizon === 'short' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-800 text-muted-foreground hover:bg-purple-500/20'
                    }`}
                    onClick={() => setForecastHorizon('short')}
                  >
                    Short Term
                  </button>
                  <button
                    className={`px-2 py-1.5 text-xs rounded-md ${
                      forecastHorizon === 'medium' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-800 text-muted-foreground hover:bg-purple-500/20'
                    }`}
                    onClick={() => setForecastHorizon('medium')}
                  >
                    Medium Term
                  </button>
                  <button
                    className={`px-2 py-1.5 text-xs rounded-md ${
                      forecastHorizon === 'long' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-800 text-muted-foreground hover:bg-purple-500/20'
                    }`}
                    onClick={() => setForecastHorizon('long')}
                  >
                    Long Term
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Effective forecast: {getYearsFromPeriod()} year{getYearsFromPeriod() > 1 ? 's' : ''}
                </p>
              </div>
            )}
            
            <div>
              <label className="text-xs text-muted-foreground block mb-1 flex justify-between">
                <span>Investment Amount</span>
                <span className="text-cyan-400">{formatCurrency(investmentAmount)}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>AED 500K</span>
                  <span>AED 10M</span>
                </div>
              </div>
              
              {/* Quick investment presets */}
              <div className="flex flex-wrap gap-1 mt-2">
                {[1000000, 2500000, 5000000].map(amount => (
                  <button
                    key={amount}
                    className={`px-2 py-0.5 text-[10px] rounded ${
                      investmentAmount === amount ? 'bg-blue-500 text-white' : 'bg-gray-800 text-muted-foreground'
                    }`}
                    onClick={() => setInvestmentAmount(amount)}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>
            
            {viewMode === 'advanced' && (
              <>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Investment Goal</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        investmentGoal === 'capital_growth' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                      }`}
                      onClick={() => setInvestmentGoal('capital_growth')}
                    >
                      Growth
                    </button>
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        investmentGoal === 'income' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                      }`}
                      onClick={() => setInvestmentGoal('income')}
                    >
                      Income
                    </button>
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        investmentGoal === 'balanced' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                      }`}
                      onClick={() => setInvestmentGoal('balanced')}
                    >
                      Balanced
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Risk Tolerance</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        riskTolerance === 'low' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-emerald-500/20'
                      }`}
                      onClick={() => setRiskTolerance('low')}
                    >
                      Low
                    </button>
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        riskTolerance === 'medium' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-amber-500/20'
                      }`}
                      onClick={() => setRiskTolerance('medium')}
                    >
                      Medium
                    </button>
                    <button
                      className={`px-2 py-1.5 text-xs rounded-md ${
                        riskTolerance === 'high' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-800 text-muted-foreground hover:bg-red-500/20'
                      }`}
                      onClick={() => setRiskTolerance('high')}
                    >
                      High
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Enable Scenario Analysis</span>
                  <button
                    className={`w-8 h-4 rounded-full flex items-center ${
                      scenarioAnalysis ? 'bg-blue-500 justify-end' : 'bg-gray-700 justify-start'
                    }`}
                    onClick={() => setScenarioAnalysis(!scenarioAnalysis)}
                  >
                    <div className="w-3 h-3 rounded-full bg-white mx-0.5"></div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="w-full sm:w-3/4 bg-gray-900/40 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-foreground flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-blue-400" />
              Predictive Market Analysis
            </h4>
            
            <div className="flex space-x-1">
              {periods.map((period) => (
                <button
                  key={period}
                  className={`px-2 py-1 text-xs rounded ${
                    period === activePeriod 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-muted-foreground hover:bg-blue-500/20'
                  }`}
                  onClick={() => setActivePeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Main visualization area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Forecast Card */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Property Value Forecast</div>
                  <div className="text-2xl font-medium text-blue-400 mt-1">{getForecastedPrice(activeArea)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Base: {formatCurrency(investmentAmount)}
                  </div>
                </div>
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 0 }}
                  className="h-16 w-16 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center"
                >
                  <div className="text-blue-400 font-medium">
                    {areaMetrics[activeArea].appreciation.current}%
                  </div>
                </motion.div>
              </div>
              
              <div className="bg-gray-900/60 p-3 rounded-lg">
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence Interval ({confidenceInterval}%)</span>
                    <span>Prediction Range</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="95"
                    step="5"
                    value={confidenceInterval}
                    onChange={(e) => setConfidenceInterval(parseInt(e.target.value))}
                    className="w-full mt-1 accent-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {['1 Year', '3 Years', '5 Years'].map((period) => {
                    const years = period === '1 Year' ? 1 : period === '3 Years' ? 3 : 5;
                    const forecast = calculateStatisticalForecast(activeArea, years);
                    
                    return (
                      <div key={period} className="bg-gray-900/60 p-2 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">{period}</div>
                        <div className="text-base font-medium text-blue-400">{forecast.forecast}%</div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{forecast.lowerBound}%</span>
                          <span>{forecast.upperBound}%</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-1 bg-blue-500 rounded-full" 
                            style={{ 
                              width: `${(forecast.forecast / forecast.upperBound) * 100}%`,
                              marginLeft: `${(forecast.lowerBound / forecast.upperBound) * 100}%`
                            }}
                          ></div>
                        </div>
                        
                        {viewMode === 'advanced' && (
                          <div className="text-xs text-amber-400/80 mt-1 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>±{forecast.volatilityImpact}%</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {viewMode === 'advanced' && (
                <div className="mt-3 bg-gray-900/60 p-2 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-xs text-muted-foreground">Selected Metrics</h6>
                    <div className="flex gap-1">
                      {['appreciation', 'rental', 'risk'].map((metric) => (
                        <button
                          key={metric}
                          className={`px-1.5 py-0.5 text-[10px] rounded ${
                            selectedMetrics.includes(metric)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-800 text-muted-foreground'
                          }`}
                          onClick={() => {
                            if (selectedMetrics.includes(metric)) {
                              if (selectedMetrics.length > 1) {
                                setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
                              }
                            } else {
                              setSelectedMetrics([...selectedMetrics, metric]);
                            }
                          }}
                        >
                          {metric.charAt(0).toUpperCase() + metric.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {selectedMetrics.includes('appreciation') && (
                      <div>
                        <div className="text-xs text-muted-foreground">Appreciation</div>
                        <div className="text-sm font-medium text-blue-400">{areaMetrics[activeArea].appreciation.current}%</div>
                      </div>
                    )}
                    {selectedMetrics.includes('rental') && (
                      <div>
                        <div className="text-xs text-muted-foreground">Rental</div>
                        <div className="text-sm font-medium text-emerald-400">{areaMetrics[activeArea].rental.current}%</div>
                      </div>
                    )}
                    {selectedMetrics.includes('risk') && (
                      <div>
                        <div className="text-xs text-muted-foreground">Risk</div>
                        <div className="text-sm font-medium text-amber-400">{areaMetrics[activeArea].risk.value}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-800">
                    <span className="text-xs text-muted-foreground">Compare Past Forecasts</span>
                    <button
                      className={`w-8 h-4 rounded-full flex items-center ${
                        comparePastForecasts ? 'bg-blue-500 justify-end' : 'bg-gray-700 justify-start'
                      }`}
                      onClick={() => setComparePastForecasts(!comparePastForecasts)}
                    >
                      <div className="w-3 h-3 rounded-full bg-white mx-0.5"></div>
                    </button>
                  </div>
                  
                  {comparePastForecasts && (
                    <div className="mt-2 bg-gray-900/60 p-2 rounded-lg">
                      <h6 className="text-xs text-muted-foreground mb-1">Past vs Current Forecasts</h6>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">2021 Prediction (for 2024)</span>
                          <span className="text-blue-400">+7.0%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">2022 Prediction (for 2024)</span>
                          <span className="text-blue-400">+8.2%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">2023 Prediction (for 2024)</span>
                          <span className="text-blue-400">+7.8%</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-white">Current Prediction (for 2024)</span>
                          <span className="text-emerald-400">+{areaMetrics[activeArea].appreciation.current}%</span>
                        </div>
                        
                        <div className="h-1 w-full bg-gray-800 rounded-full mt-1 relative">
                          <div className="absolute h-3 w-1 bg-blue-400/50 rounded-full top-1/2 transform -translate-y-1/2" style={{left: '35%'}}></div>
                          <div className="absolute h-3 w-1 bg-blue-400/50 rounded-full top-1/2 transform -translate-y-1/2" style={{left: '41%'}}></div>
                          <div className="absolute h-3 w-1 bg-blue-400/50 rounded-full top-1/2 transform -translate-y-1/2" style={{left: '39%'}}></div>
                          <div className="absolute h-3 w-1 bg-emerald-400 rounded-full top-1/2 transform -translate-y-1/2" 
                              style={{left: `${(areaMetrics[activeArea].appreciation.current * 5)}%`}}></div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
                          <Info className="h-3 w-3 mr-1" />
                          <span>Forecast accuracy: {areaMetrics[activeArea].confidenceScores.forecastAccuracy}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">Model: {forecastModel.charAt(0).toUpperCase() + forecastModel.slice(1)}</span>
                <div className="flex items-center">
                  <span className="text-xs mr-2 text-muted-foreground">Risk Adjusted</span>
                  <button
                    className={`w-8 h-4 rounded-full flex items-center ${
                      riskAdjusted ? 'bg-blue-500 justify-end' : 'bg-gray-700 justify-start'
                    }`}
                    onClick={() => setRiskAdjusted(!riskAdjusted)}
                  >
                    <div className="w-3 h-3 rounded-full bg-white mx-0.5"></div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Historical Performance Chart */}
            <div className="bg-gray-900/40 rounded-lg p-4 shadow-md">
              <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <LineChart className="h-4 w-4 mr-1 text-blue-400" />
                Historical Performance
                {comparisonAreas.length > 0 && (
                  <Badge className="ml-1 bg-purple-500/20 text-purple-400 font-medium border-none text-xs">
                    Comparing {comparisonAreas.length}
                  </Badge>
                )}
              </h5>
              
              <div className="h-[180px] relative">
                {/* SVG chart visualization */}
                <svg width="100%" height="100%" viewBox="0 0 300 180" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#333" strokeWidth="1" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#333" strokeWidth="1" />
                  <line x1="0" y1="120" x2="300" y2="120" stroke="#333" strokeWidth="1" />
                  <line x1="60" y1="0" x2="60" y2="180" stroke="#333" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="180" stroke="#333" strokeWidth="1" />
                  <line x1="180" y1="0" x2="180" y2="180" stroke="#333" strokeWidth="1" />
                  <line x1="240" y1="0" x2="240" y2="180" stroke="#333" strokeWidth="1" />
                  
                  {/* Comparison Areas - Appreciation rate lines */}
                  {comparisonAreas.map((area, index) => (
                    <path 
                      key={`${area}-appreciation`}
                      d={`M 0 ${150 - (areaMetrics[area].appreciation.historical['2019'] * 10)} 
                         L 60 ${150 - (areaMetrics[area].appreciation.historical['2020'] * 10)} 
                         L 120 ${150 - (areaMetrics[area].appreciation.historical['2021'] * 10)} 
                         L 180 ${150 - (areaMetrics[area].appreciation.historical['2022'] * 10)} 
                         L 240 ${150 - (areaMetrics[area].appreciation.historical['2023'] * 10)} 
                         L 300 ${150 - (areaMetrics[area].appreciation.current * 10)}`}
                      fill="none"
                      stroke={index % 2 === 0 ? "#9333EA" : "#EC4899"}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.7"
                    />
                  ))}
                  
                  {/* Primary Area - Appreciation rate line */}
                  <path 
                    d={`M 0 ${150 - (areaMetrics[activeArea].appreciation.historical['2019'] * 10)} 
                         L 60 ${150 - (areaMetrics[activeArea].appreciation.historical['2020'] * 10)} 
                         L 120 ${150 - (areaMetrics[activeArea].appreciation.historical['2021'] * 10)} 
                         L 180 ${150 - (areaMetrics[activeArea].appreciation.historical['2022'] * 10)} 
                         L 240 ${150 - (areaMetrics[activeArea].appreciation.historical['2023'] * 10)} 
                         L 300 ${150 - (areaMetrics[activeArea].appreciation.current * 10)}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  
                  {/* Primary Area - Rental yield line */}
                  <path 
                    d={`M 0 ${150 - (areaMetrics[activeArea].rental.historical['2019'] * 10)} 
                         L 60 ${150 - (areaMetrics[activeArea].rental.historical['2020'] * 10)} 
                         L 120 ${150 - (areaMetrics[activeArea].rental.historical['2021'] * 10)} 
                         L 180 ${150 - (areaMetrics[activeArea].rental.historical['2022'] * 10)} 
                         L 240 ${150 - (areaMetrics[activeArea].rental.historical['2023'] * 10)} 
                         L 300 ${150 - (areaMetrics[activeArea].rental.current * 10)}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  
                  {/* Forecast area if viewMode is advanced */}
                  {viewMode === 'advanced' && (
                    <path 
                      d={`M 300 ${150 - (areaMetrics[activeArea].appreciation.current * 10)} 
                           L 320 ${150 - (areaMetrics[activeArea].appreciation.forecast['2024'] * 10)} 
                           L 340 ${150 - (areaMetrics[activeArea].appreciation.forecast['2025'] * 10)} 
                           L 360 ${150 - (areaMetrics[activeArea].appreciation.forecast['2026'] * 10)}`}
                      fill="none"
                      stroke="#3B82F6"
                      strokeDasharray="4,4"
                      strokeWidth="2"
                    />
                  )}
                </svg>
                
                {/* Chart labels */}
                <div className="absolute left-0 bottom-0 right-0 flex justify-between text-xs text-muted-foreground">
                  <span>2019</span>
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
                
                <div className="absolute top-0 right-0 flex flex-col items-end space-y-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-muted-foreground">{activeArea} Appreciation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-muted-foreground">Rental Yield</span>
                  </div>
                  
                  {/* Comparison legend items */}
                  {comparisonAreas.length > 0 && (
                    <div className="pt-1 border-t border-gray-700 mt-1">
                      {comparisonAreas.map((area, index) => (
                        <div key={area} className="flex items-center space-x-1 mt-1">
                          <div className="w-2 h-2 rounded-full" 
                            style={{backgroundColor: index % 2 === 0 ? "#9333EA" : "#EC4899"}}></div>
                          <span className="text-xs text-muted-foreground">{area}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Add comparison metrics if areas are selected */}
              {comparisonAreas.length > 0 && (
                <div className="mt-3 bg-gray-900/60 p-2 rounded-lg">
                  <h6 className="text-xs text-muted-foreground mb-2">Comparison Metrics</h6>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Highest Appreciation</div>
                      <div className="text-sm font-medium text-blue-400">
                        {[activeArea, ...comparisonAreas]
                          .sort((a, b) => areaMetrics[b].appreciation.current - areaMetrics[a].appreciation.current)[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Lowest Risk</div>
                      <div className="text-sm font-medium text-emerald-400">
                        {[activeArea, ...comparisonAreas]
                          .sort((a, b) => areaMetrics[a].risk.score - areaMetrics[b].risk.score)[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Highest ROI</div>
                      <div className="text-sm font-medium text-purple-400">
                        {[activeArea, ...comparisonAreas]
                          .sort((a, b) => 
                            (areaMetrics[b].appreciation.current + areaMetrics[b].rental.current) - 
                            (areaMetrics[a].appreciation.current + areaMetrics[a].rental.current)
                          )[0]}
                      </div>
                    </div>
                  </div>

                  {/* Portfolio diversification benefit calculation */}
                  {comparisonAreas.length > 1 && (
                    <div className="mt-2 pt-2 border-t border-gray-800">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Portfolio Volatility Reduction</span>
                        <span className="text-emerald-400">
                          -{calculateDiversificationImpact([activeArea, ...comparisonAreas]).diversificationBenefit}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Add trend analysis if advanced view */}
              {viewMode === 'advanced' && (
                <div className="mt-3 bg-gray-900/60 p-2 rounded-lg">
                  <h6 className="text-xs text-muted-foreground mb-2">Trend Analysis</h6>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Volatility</div>
                      <div className="text-sm font-medium text-blue-400">{areaMetrics[activeArea].volatility}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Market Cycle</div>
                      <div className="text-sm font-medium text-blue-400 capitalize">{areaMetrics[activeArea].marketCycle}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Investment Metrics */}
            <div className="bg-gray-900/40 rounded-lg p-4 shadow-md">
              <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <BarChart className="h-4 w-4 mr-1 text-blue-400" />
                Investment Analysis
              </h5>
              
              <div className="space-y-4">
                <div className="bg-gray-900/60 p-3 rounded-lg">
                  <h6 className="text-xs text-muted-foreground mb-2">Return On Investment</h6>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Appreciation</div>
                      <div className="text-base font-medium text-blue-400">{areaMetrics[activeArea].appreciation.current}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Rental Yield</div>
                      <div className="text-base font-medium text-emerald-400">{areaMetrics[activeArea].rental.current}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Total ROI</div>
                      <div className="text-base font-medium text-purple-400">{getROIBreakdown(activeArea).total}%</div>
                    </div>
                  </div>
                  
                  {viewMode === 'advanced' && (
                    <div className="mt-2 pt-2 border-t border-gray-800">
                      <div className="text-xs text-muted-foreground mb-1">Compounded ({getYearsFromPeriod()}Y)</div>
                      <div className="text-sm font-medium text-purple-400">{getROIBreakdown(activeArea).compounded}%</div>
                      
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Risk-Adjusted</span>
                        <span className="text-amber-400">{getRiskAdjustedReturns(activeArea).riskAdjusted}%</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-900/60 p-3 rounded-lg">
                  <h6 className="text-xs text-muted-foreground mb-2">Market Data</h6>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Supply/Demand Ratio</span>
                      <span className={`${areaMetrics[activeArea].supplyDemand.ratio > 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {areaMetrics[activeArea].supplyDemand.ratio.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Transaction Volume</span>
                      <span className="text-white">
                        {areaMetrics[activeArea].transactionVolume.value.toLocaleString()} 
                        <span className={`ml-1 ${
                          areaMetrics[activeArea].transactionVolume.trend === 'up' 
                            ? 'text-emerald-400' 
                            : areaMetrics[activeArea].transactionVolume.trend === 'down'
                            ? 'text-red-400'
                            : 'text-blue-400'
                        }`}>
                          ({areaMetrics[activeArea].transactionVolume.trend === 'up' ? '+' : 
                             areaMetrics[activeArea].transactionVolume.trend === 'down' ? '-' : ''}
                          {areaMetrics[activeArea].transactionVolume.percentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Price per Sq.Ft</span>
                      <span className="text-white">
                        AED {areaMetrics[activeArea].pricePerSqFt.value}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Market Cycle</span>
                      <span className="text-white capitalize">{areaMetrics[activeArea].marketCycle}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/60 p-3 rounded-lg">
                  <h6 className="text-xs text-muted-foreground mb-2 flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Risk Assessment
                  </h6>
                  <div className="relative h-2 bg-gray-800 rounded-full mb-1 overflow-hidden">
                    <div 
                      className={`absolute h-2 ${
                        areaMetrics[activeArea].risk.score < 30 
                          ? 'bg-emerald-500' 
                          : areaMetrics[activeArea].risk.score < 50 
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{width: `${areaMetrics[activeArea].risk.score}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-400">Low</span>
                    <span className="text-amber-400">Medium</span>
                    <span className="text-red-400">High</span>
                  </div>
                  
                  {viewMode === 'advanced' && (
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Key factors:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {areaMetrics[activeArea].risk.factors.map((factor, idx) => (
                          <span key={idx} className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Advanced Analytics Section - Only visible when viewMode is 'advanced' */}
      {viewMode === 'advanced' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Macroeconomic Indicators */}
          <div className="bg-gray-900/40 rounded-lg p-4 shadow-md">
            <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Building className="h-4 w-4 mr-1 text-blue-400" />
              Macroeconomic Impact
            </h5>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>GDP Impact</span>
                  <span>{(areaMetrics[activeArea].macroIndicators.gdpImpact * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-emerald-500 rounded-full" 
                    style={{width: `${areaMetrics[activeArea].macroIndicators.gdpImpact * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Population Growth</span>
                  <span>{areaMetrics[activeArea].macroIndicators.populationGrowth}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{width: `${areaMetrics[activeArea].macroIndicators.populationGrowth * 25}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Tourism Effect</span>
                  <span>{(areaMetrics[activeArea].macroIndicators.tourismEffect * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-purple-500 rounded-full" 
                    style={{width: `${areaMetrics[activeArea].macroIndicators.tourismEffect * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Infrastructure Score</span>
                  <span>{areaMetrics[activeArea].macroIndicators.infrastructureScore}/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-amber-500 rounded-full" 
                    style={{width: `${areaMetrics[activeArea].macroIndicators.infrastructureScore}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Global economic factors */}
            <div className="mt-4 bg-gray-900/60 rounded-lg p-3">
              <h6 className="text-xs text-muted-foreground mb-2">UAE Economic Outlook</h6>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">GDP Growth</span>
                  <span className="text-emerald-400">+{economicFactors.gdp_growth}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Inflation</span>
                  <span className="text-amber-400">{economicFactors.inflation}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Construction Growth</span>
                  <span className="text-emerald-400">+{economicFactors.construction_sector_growth}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Interest Rate Trend</span>
                  <span className={economicFactors.interest_rate_trend > 0 ? 'text-red-400' : 'text-emerald-400'}>
                    {economicFactors.interest_rate_trend > 0 ? '+' : ''}{economicFactors.interest_rate_trend}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Segmentation and Indicators */}
          <div className="bg-gray-900/40 rounded-lg p-4 shadow-md">
            <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <PieChart className="h-4 w-4 mr-1 text-blue-400" />
              Market Segmentation
            </h5>
            
            <div className="space-y-4">
              {/* Market confidence scores */}
              <div className="bg-gray-900/60 rounded-lg p-3">
                <h6 className="text-xs text-muted-foreground mb-2">Confidence Metrics</h6>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Forecast Accuracy</span>
                      <span>{areaMetrics[activeArea].confidenceScores.forecastAccuracy}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-1.5 bg-blue-500 rounded-full" 
                        style={{width: `${areaMetrics[activeArea].confidenceScores.forecastAccuracy}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Data Density</span>
                      <span>{areaMetrics[activeArea].confidenceScores.dataDensity}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-1.5 bg-emerald-500 rounded-full" 
                        style={{width: `${areaMetrics[activeArea].confidenceScores.dataDensity}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Market Predictability</span>
                      <span>{areaMetrics[activeArea].confidenceScores.marketPredictability}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-1.5 bg-amber-500 rounded-full" 
                        style={{width: `${areaMetrics[activeArea].confidenceScores.marketPredictability}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Price segments */}
              <div className="bg-gray-900/60 rounded-lg p-3">
                <h6 className="text-xs text-muted-foreground mb-2">Price Segments</h6>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900/60 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Luxury Segment</div>
                    <div className="text-sm font-medium text-purple-400 mt-1">
                      +{areaMetrics[activeArea].luxurySegment.premium}% premium
                    </div>
                    <div className="text-xs text-blue-400 mt-0.5">
                      Growing {areaMetrics[activeArea].luxurySegment.growth}%/year
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/60 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Affordable Segment</div>
                    <div className="text-sm font-medium text-amber-400 mt-1">
                      {areaMetrics[activeArea].affordableSegment.discount}% discount
                    </div>
                    <div className="text-xs text-blue-400 mt-0.5">
                      Growing {areaMetrics[activeArea].affordableSegment.growth}%/year
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Investor demographics */}
              <div className="bg-gray-900/60 rounded-lg p-3">
                <h6 className="text-xs text-muted-foreground mb-2">Investor Demographics</h6>
                <div className="flex items-center mb-2">
                  <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-4 bg-emerald-500 rounded-l-full" 
                      style={{width: `${areaMetrics[activeArea].investorDemographics.local}%`}}
                    ></div>
                    <div 
                      className="absolute h-4 bg-blue-500 rounded-r-full" 
                      style={{width: `${areaMetrics[activeArea].investorDemographics.international}%`, right: 0}}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                    <span className="text-muted-foreground">Local: {areaMetrics[activeArea].investorDemographics.local}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-muted-foreground">International: {areaMetrics[activeArea].investorDemographics.international}%</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">Top Investor Countries</div>
                  <div className="flex flex-wrap gap-1">
                    {areaMetrics[activeArea].investorDemographics.topCountries.map((country, idx) => (
                      <span key={idx} className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Scenario Analysis - Only visible when scenarioAnalysis is true and viewMode is advanced */}
      {scenarioAnalysis && viewMode === 'advanced' && (
        <div className="mt-4 bg-gray-900/40 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-400" />
              Scenario Analysis
            </h5>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Show All Data</span>
              <button
                className={`w-8 h-4 rounded-full flex items-center ${
                  showAllData ? 'bg-blue-500 justify-end' : 'bg-gray-700 justify-start'
                }`}
                onClick={() => setShowAllData(!showAllData)}
              >
                <div className="w-3 h-3 rounded-full bg-white mx-0.5"></div>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Regulatory Impact Scenarios */}
            <div className="bg-gray-900/60 rounded-lg p-3">
              <h6 className="text-xs text-muted-foreground mb-3">Regulatory Impact Scenarios</h6>
              
              <div className="space-y-3">
                {/* Show only top 3 scenarios by default unless showAllData is true */}
                {(showAllData ? [
                  {
                    name: "Visa Reforms (Expanded)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.2),
                    positive: true
                  },
                  {
                    name: "Foreign Ownership (Liberalized)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.15),
                    positive: true
                  },
                  {
                    name: "Property Tax (Increased)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.1),
                    positive: false
                  },
                  {
                    name: "Golden Visa Updates",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.12),
                    positive: true
                  },
                  {
                    name: "Ownership Restrictions",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.18),
                    positive: false
                  }
                ] : [
                  {
                    name: "Visa Reforms (Expanded)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.2),
                    positive: true
                  },
                  {
                    name: "Foreign Ownership (Liberalized)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.15),
                    positive: true
                  },
                  {
                    name: "Property Tax (Increased)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.1),
                    positive: false
                  }
                ]).map((scenario, index) => (
                  <div key={`reg-${index}`}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{scenario.name}</span>
                      <span className={scenario.positive ? "text-emerald-400" : "text-red-400"}>
                        {scenario.positive ? '+' : '-'}{scenario.impact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-1.5 ${scenario.positive ? 'bg-emerald-500' : 'bg-red-500'} rounded-full`}
                        style={{width: `${(scenario.impact / 3) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Economic Scenarios */}
            <div className="bg-gray-900/60 rounded-lg p-3">
              <h6 className="text-xs text-muted-foreground mb-3">Economic Scenarios</h6>
              
              <div className="space-y-3">
                {/* Show only top 3 scenarios by default unless showAllData is true */}
                {(showAllData ? [
                  {
                    name: "Interest Rate (+2%)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.3),
                    positive: false
                  },
                  {
                    name: "Tourism Growth (+10%)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.1),
                    positive: true
                  },
                  {
                    name: "Global Recession",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.5),
                    positive: false
                  },
                  {
                    name: "Oil Price Increase",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.15),
                    positive: true
                  },
                  {
                    name: "UAE Economic Expansion",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.25),
                    positive: true
                  }
                ] : [
                  {
                    name: "Interest Rate (+2%)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.3),
                    positive: false
                  },
                  {
                    name: "Tourism Growth (+10%)",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.1),
                    positive: true
                  },
                  {
                    name: "Global Recession",
                    impact: (areaMetrics[activeArea].appreciation.current * 0.5),
                    positive: false
                  }
                ]).map((scenario, index) => (
                  <div key={`econ-${index}`}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{scenario.name}</span>
                      <span className={scenario.positive ? "text-emerald-400" : "text-red-400"}>
                        {scenario.positive ? '+' : '-'}{scenario.impact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-1.5 ${scenario.positive ? 'bg-emerald-500' : 'bg-red-500'} rounded-full`}
                        style={{width: `${(scenario.impact / 3) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Economic variable adjustment inputs */}
            <div className="md:col-span-2 bg-gray-900/80 rounded-lg p-3">
              <h6 className="text-xs text-muted-foreground mb-3">Customize Economic Assumptions</h6>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Inflation Assumption (%)</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800/80 rounded border-gray-700 text-sm p-2"
                    value={inflationAssumption}
                    onChange={(e) => setInflationAssumption(Number(e.target.value))}
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Interest Rate Assumption (%)</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800/80 rounded border-gray-700 text-sm p-2"
                    value={interestRateAssumption}
                    onChange={(e) => setInterestRateAssumption(Number(e.target.value))}
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">Consider Tax Effects</span>
                <button
                  className={`w-8 h-4 rounded-full flex items-center ${
                    taxConsiderations ? 'bg-blue-500 justify-end' : 'bg-gray-700 justify-start'
                  }`}
                  onClick={() => setTaxConsiderations(!taxConsiderations)}
                >
                  <div className="w-3 h-3 rounded-full bg-white mx-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer with data sources and disclaimer */}
      <div className="mt-6 bg-gray-900/40 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="text-xs text-muted-foreground">
          <p>Data sources: RERA, Dubai Land Department, Abu Dhabi DPM, Property Finder Market Report, Knight Frank GCC</p>
          <p className="mt-1">Last updated: May 2024</p>
        </div>
        <div className="flex gap-3 mt-3 sm:mt-0">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1 text-blue-400"
              onClick={handleExportReport}
            >
              <Download className="h-3 w-3" />
              Export {exportFormat.toUpperCase()}
            </Button>
            
            <div className="absolute right-0 top-full mt-1 bg-gray-800 rounded shadow-lg z-10 hidden group-hover:block">
              <div className="py-1">
                {(['pdf', 'csv', 'excel'] as const).map((format) => (
                  <button
                    key={format}
                    className={`block w-full text-left px-4 py-1 text-xs ${exportFormat === format ? 'bg-blue-500/20 text-blue-400' : 'text-muted-foreground hover:bg-gray-700'}`}
                    onClick={() => setExportFormat(format)}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs flex items-center gap-1">
            <Info className="h-3 w-3" />
            Methodology
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs flex items-center gap-1 text-muted-foreground"
            onClick={() => setViewMode(viewMode === 'simple' ? 'advanced' : 'simple')}
          >
            {viewMode === 'advanced' ? (
              <>
                <EyeOff className="h-3 w-3" />
                Hide Advanced
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" />
                Show Advanced
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 