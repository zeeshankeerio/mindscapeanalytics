/**
 * System Health Monitoring Utilities
 * 
 * This module provides tools for monitoring system performance metrics
 * and detecting anomalies in the system behavior.
 */

import { EventEmitter } from 'events';

export type SystemMetric = 'cpu' | 'memory' | 'storage' | 'network' | 'gpu';

export interface SystemMetricData {
  value: number;
  timestamp: number;
  status: 'normal' | 'warning' | 'critical';
  trend: 'stable' | 'increasing' | 'decreasing';
}

export interface SystemHealth {
  cpu: SystemMetricData;
  memory: SystemMetricData;
  storage: SystemMetricData;
  network: SystemMetricData;
  gpu: SystemMetricData;
  overall: {
    status: 'normal' | 'warning' | 'critical';
    uptime: number;
    lastRefreshed: number;
  };
}

// Thresholds for each metric
const WARNING_THRESHOLDS = {
  cpu: 65,
  memory: 70,
  storage: 75,
  network: 60,
  gpu: 75,
};

const CRITICAL_THRESHOLDS = {
  cpu: 85,
  memory: 90,
  storage: 90,
  network: 85,
  gpu: 90,
};

// Mock data history for trend analysis
const METRICS_HISTORY: Record<SystemMetric, SystemMetricData[]> = {
  cpu: [],
  memory: [],
  storage: [],
  network: [],
  gpu: [],
};

// Maximum history length for each metric
const MAX_HISTORY_LENGTH = 20;

class SystemMonitor extends EventEmitter {
  private health: SystemHealth;
  private initialized: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private updateFrequency: number = 5000; // 5 seconds default
  
  constructor() {
    super();
    
    // Initialize with default values
    this.health = {
      cpu: this.createDefaultMetric(),
      memory: this.createDefaultMetric(),
      storage: this.createDefaultMetric(),
      network: this.createDefaultMetric(),
      gpu: this.createDefaultMetric(),
      overall: {
        status: 'normal',
        uptime: 0,
        lastRefreshed: Date.now(),
      },
    };
  }
  
  private createDefaultMetric(): SystemMetricData {
    return {
      value: 0,
      timestamp: Date.now(),
      status: 'normal',
      trend: 'stable',
    };
  }
  
  /**
   * Start the monitoring system
   * @param updateFrequency Frequency of updates in milliseconds
   */
  public start(updateFrequency: number = 5000): void {
    if (this.intervalId) {
      this.stop();
    }
    
    this.updateFrequency = updateFrequency;
    this.initialized = true;
    
    // Initial update
    this.updateMetrics();
    
    // Schedule regular updates
    this.intervalId = setInterval(() => {
      this.updateMetrics();
    }, this.updateFrequency);
    
    this.emit('started');
  }
  
  /**
   * Stop the monitoring system
   */
  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.emit('stopped');
    }
  }
  
  /**
   * Update all metrics
   */
  private updateMetrics(): void {
    // In a real implementation, this would gather actual system metrics
    // For this demo, we'll simulate realistic values
    this.updateMetric('cpu', this.simulateMetric('cpu'));
    this.updateMetric('memory', this.simulateMetric('memory'));
    this.updateMetric('storage', this.simulateMetric('storage'));
    this.updateMetric('network', this.simulateMetric('network'));
    this.updateMetric('gpu', this.simulateMetric('gpu'));
    
    // Update overall system status
    this.updateOverallStatus();
    
    // Update uptime
    this.health.overall.uptime += this.updateFrequency / 1000;
    this.health.overall.lastRefreshed = Date.now();
    
    // Emit updated event
    this.emit('updated', this.health);
    
    // Check for anomalies
    this.detectAnomalies();
  }
  
  /**
   * Simulate a realistic metric value
   */
  private simulateMetric(metric: SystemMetric): number {
    const history = METRICS_HISTORY[metric];
    const lastValue = history.length > 0 
      ? history[history.length - 1].value 
      : Math.random() * 50 + 20; // Initial value between 20-70
    
    // Add some realistic fluctuation
    let change = (Math.random() - 0.5) * 5;
    
    // Add some trend bias based on the metric
    switch (metric) {
      case 'cpu':
        // CPU tends to spike and drop quickly
        change = Math.random() > 0.8 ? change * 3 : change;
        break;
      case 'memory':
        // Memory tends to gradually increase
        change = change + 0.5;
        break;
      case 'storage':
        // Storage changes very slowly
        change = change * 0.2;
        break;
      case 'network':
        // Network is highly variable
        change = change * 2;
        break;
      case 'gpu':
        // GPU usage varies depending on tasks
        change = Math.random() > 0.7 ? change * 4 : change * 0.5;
        break;
    }
    
    // Calculate new value, ensuring it stays within bounds
    let newValue = Math.max(5, Math.min(98, lastValue + change));
    
    return newValue;
  }
  
  /**
   * Update a specific metric
   */
  private updateMetric(metric: SystemMetric, value: number): void {
    const timestamp = Date.now();
    
    // Determine status based on thresholds
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (value >= CRITICAL_THRESHOLDS[metric]) {
      status = 'critical';
    } else if (value >= WARNING_THRESHOLDS[metric]) {
      status = 'warning';
    }
    
    // Determine trend by analyzing history
    const history = METRICS_HISTORY[metric];
    let trend: 'stable' | 'increasing' | 'decreasing' = 'stable';
    
    if (history.length >= 3) {
      const last3 = history.slice(-3);
      const average = last3.reduce((sum, item) => sum + item.value, 0) / 3;
      
      if (value > average * 1.05) {
        trend = 'increasing';
      } else if (value < average * 0.95) {
        trend = 'decreasing';
      }
    }
    
    // Create new metric data
    const metricData: SystemMetricData = {
      value,
      timestamp,
      status,
      trend,
    };
    
    // Update current health
    this.health[metric] = metricData;
    
    // Add to history
    METRICS_HISTORY[metric].push(metricData);
    
    // Trim history if needed
    if (METRICS_HISTORY[metric].length > MAX_HISTORY_LENGTH) {
      METRICS_HISTORY[metric].shift();
    }
    
    // Emit an event if the status changed
    const prevStatus = history.length > 0 ? history[history.length - 1].status : 'normal';
    if (status !== prevStatus) {
      this.emit('statusChanged', {
        metric,
        previousStatus: prevStatus,
        currentStatus: status,
        value,
      });
    }
  }
  
  /**
   * Update the overall system status
   */
  private updateOverallStatus(): void {
    const metrics = ['cpu', 'memory', 'storage', 'network', 'gpu'] as const;
    
    // If any metric is critical, the overall status is critical
    if (metrics.some(metric => this.health[metric].status === 'critical')) {
      this.health.overall.status = 'critical';
    }
    // If any metric is warning, the overall status is warning
    else if (metrics.some(metric => this.health[metric].status === 'warning')) {
      this.health.overall.status = 'warning';
    }
    // Otherwise, the overall status is normal
    else {
      this.health.overall.status = 'normal';
    }
  }
  
  /**
   * Detect anomalies in system behavior
   */
  private detectAnomalies(): void {
    const metrics = ['cpu', 'memory', 'storage', 'network', 'gpu'] as const;
    
    // Check for sudden spikes in usage
    for (const metric of metrics) {
      const history = METRICS_HISTORY[metric];
      if (history.length < 3) continue;
      
      const current = history[history.length - 1].value;
      const previous = history[history.length - 2].value;
      const prevPrevious = history[history.length - 3].value;
      
      // Check if current value is significantly higher than the average of the last two
      const avgPrevious = (previous + prevPrevious) / 2;
      if (current > avgPrevious * 1.5) {
        this.emit('anomaly', {
          type: 'spike',
          metric,
          value: current,
          previous: avgPrevious,
          timestamp: Date.now(),
        });
      }
      
      // Check for sustained high usage
      if (history.length >= 5) {
        const last5 = history.slice(-5);
        const allHigh = last5.every(item => 
          item.status === 'warning' || item.status === 'critical'
        );
        
        if (allHigh) {
          this.emit('anomaly', {
            type: 'sustained_high_usage',
            metric,
            duration: 5 * this.updateFrequency / 1000, // in seconds
            timestamp: Date.now(),
          });
        }
      }
    }
  }
  
  /**
   * Get the current system health
   */
  public getHealth(): SystemHealth {
    if (!this.initialized) {
      this.updateMetrics();
      this.initialized = true;
    }
    return this.health;
  }
  
  /**
   * Get history data for a specific metric
   */
  public getMetricHistory(metric: SystemMetric): SystemMetricData[] {
    return [...METRICS_HISTORY[metric]];
  }
  
  /**
   * Force refresh all metrics
   */
  public forceRefresh(): void {
    this.updateMetrics();
  }
}

// Export singleton instance
export const systemMonitor = new SystemMonitor();

// Auto-start the monitor with default settings
if (typeof window !== 'undefined') {
  systemMonitor.start();
}

export default systemMonitor; 