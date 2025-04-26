import { NextRequest, NextResponse } from 'next/server'

// Mock insights data
const mockInsightsData = {
  insights: [
    {
      id: "ins1",
      title: "Revenue Growth Outpacing Market Average",
      description: "Your monthly revenue growth rate of 12.5% is significantly higher than the industry average of 7.2%, indicating strong market positioning and effective sales strategies.",
      category: "revenue",
      type: "growth",
      impact: "high",
      confidence: 92,
      timeframe: "current",
      metrics: [
        { name: "Revenue Growth", value: "12.5%", change: 5.3 },
        { name: "Market Average", value: "7.2%", change: 0 },
        { name: "Competitive Index", value: "1.74", change: 0.3 }
      ],
      recommendation: "Consider expanding product offerings in high-performing segments to capitalize on current market advantage."
    },
    {
      id: "ins2",
      title: "Customer Acquisition Cost Increasing",
      description: "Customer acquisition costs have increased by 18% quarter-over-quarter, potentially impacting profitability if the trend continues.",
      category: "customers",
      type: "warning",
      impact: "medium",
      confidence: 85,
      timeframe: "immediate",
      metrics: [
        { name: "Current CAC", value: "$42.30", change: 18 },
        { name: "Previous Quarter", value: "$35.80", change: 0 },
        { name: "CLV Ratio", value: "3.2:1", change: -0.5 }
      ],
      recommendation: "Review marketing channel performance and optimize spend allocation to reduce acquisition costs."
    },
    {
      id: "ins3",
      title: "Inventory Turnover Optimization Opportunity",
      description: "Analysis indicates potential for a 15% improvement in inventory turnover by optimizing reorder points for top 20 SKUs.",
      category: "operations",
      type: "opportunity",
      impact: "medium",
      confidence: 78,
      timeframe: "short-term",
      metrics: [
        { name: "Current Turnover", value: "12.4 days", change: 0 },
        { name: "Potential Turnover", value: "10.5 days", change: -15 },
        { name: "Carrying Cost Impact", value: "$12,450", change: -15 }
      ],
      recommendation: "Implement dynamic reorder points based on AI-powered demand forecasting for top 20 SKUs."
    },
    {
      id: "ins4",
      title: "Mobile Conversion Rate Below Desktop",
      description: "Mobile conversion rate is 2.4% compared to 4.1% on desktop, representing a significant opportunity gap and potential UX issues.",
      category: "customers",
      type: "opportunity",
      impact: "high",
      confidence: 90,
      timeframe: "immediate",
      metrics: [
        { name: "Mobile Conversion", value: "2.4%", change: 0 },
        { name: "Desktop Conversion", value: "4.1%", change: 0 },
        { name: "Mobile Traffic", value: "62%", change: 4 }
      ],
      recommendation: "Prioritize mobile UX improvements focused on checkout flow simplification."
    },
    {
      id: "ins5",
      title: "Market Share Increase Predicted",
      description: "Predictive models indicate potential for 3.5% market share growth over next two quarters based on current trajectory and competitive landscape.",
      category: "market",
      type: "prediction",
      impact: "high",
      confidence: 75,
      timeframe: "long-term",
      metrics: [
        { name: "Current Share", value: "12.3%", change: 0 },
        { name: "Projected Share", value: "15.8%", change: 3.5 },
        { name: "Competitor Weakness", value: "High", change: 0 }
      ],
      recommendation: "Increase marketing spend in regions where main competitor is showing weakness signals."
    },
    {
      id: "ins6",
      title: "Product Category Growth Opportunity",
      description: "Premium accessories category showing 34% YoY growth with 22% higher margins than company average, indicating expansion opportunity.",
      category: "revenue",
      type: "opportunity",
      impact: "medium",
      confidence: 88,
      timeframe: "short-term",
      metrics: [
        { name: "Category Growth", value: "34%", change: 0 },
        { name: "Margin Difference", value: "22%", change: 0 },
        { name: "Inventory Turnover", value: "14.2 days", change: -2.1 }
      ],
      recommendation: "Expand product range in premium accessories category and increase marketing allocation."
    }
  ],
  metrics: {
    revenue: { value: 248500, change: 12.4 },
    customers: { value: 2345, change: 8.2 },
    avgOrderValue: { value: 105.32, change: -2.3 },
    conversionRate: { value: 3.8, change: 0.5 },
    customerRetention: { value: 68, change: 2.1 }
  },
  predictions: [
    {
      id: "pred1",
      metric: "Revenue",
      current: 248500,
      predicted: 276000,
      timeframe: "Next Quarter",
      confidence: 85
    },
    {
      id: "pred2",
      metric: "Customer Growth",
      current: 8.2,
      predicted: 10.5,
      timeframe: "Next Quarter",
      confidence: 72
    }
  ]
};

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would fetch this data from a database
    // Here we're returning mock insights data
    const insights = {
      summary: {
        totalUsers: 14782,
        activeUsers: 8935,
        conversionRate: 4.3,
        revenue: 83259.42,
        growthRate: 18.7
      },
      trends: {
        userGrowth: [1323, 1422, 1567, 1689, 1755, 1832, 1920],
        revenue: [15420, 16830, 18290, 19560, 21340, 22980, 25340],
        engagement: [68, 72, 74, 71, 75, 79, 82],
        conversion: [3.2, 3.4, 3.7, 3.9, 4.1, 4.2, 4.3]
      },
      recommendations: [
        {
          id: 'rec1',
          title: 'Optimize User Onboarding',
          description: 'Users are dropping off during the payment flow. Consider simplifying the checkout process.',
          impact: 'high',
          effort: 'medium',
          category: 'conversion'
        },
        {
          id: 'rec2',
          title: 'Expand Social Media Presence',
          description: 'Traffic from social channels has increased by 24%. Consider investing more in these channels.',
          impact: 'medium',
          effort: 'low',
          category: 'marketing'
        },
        {
          id: 'rec3',
          title: 'Personalize User Dashboard',
          description: 'Users who customize their dashboard have 37% higher retention. Promote this feature more prominently.',
          impact: 'high',
          effort: 'high',
          category: 'engagement'
        }
      ],
      recentActivity: [
        {
          id: 'act1',
          type: 'new_signup',
          user: 'Enterprise Corp',
          plan: 'Enterprise',
          value: 7500,
          date: '2023-04-12T14:32:00Z'
        },
        {
          id: 'act2',
          type: 'upgrade',
          user: 'TechStart Inc',
          plan: 'Professional',
          value: 1200,
          date: '2023-04-11T09:15:00Z'
        },
        {
          id: 'act3',
          type: 'renewal',
          user: 'InnovateLabs',
          plan: 'Team',
          value: 3600,
          date: '2023-04-10T16:45:00Z'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard insights error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log the request data for debugging
    console.log('Received insight generation request:', data);
    
    // Simulate processing time for generating insights
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return the same mock data as if new insights were generated
    return NextResponse.json({
      success: true,
      message: "New insights generated successfully",
      data: mockInsightsData
    }, {
      status: 201,
      headers: corsHeaders
    })
  } catch (error) {
    console.error("Error generating insights:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to generate insights",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500, headers: corsHeaders }
    )
  }
} 