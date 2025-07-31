import alertsData from "@/services/mockData/alerts.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const alertsService = {
  async getAll() {
    await delay(250);
    
    try {
      return [...alertsData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      throw new Error("Failed to fetch alerts");
    }
  },

  async getById(id) {
    await delay(200);
    
    try {
      const alert = alertsData.find(a => a.Id === parseInt(id));
      if (!alert) {
        throw new Error("Alert not found");
      }
      return { ...alert };
    } catch (error) {
      throw new Error("Failed to fetch alert");
    }
  },

  async create(alertData) {
    await delay(300);
    
    try {
      const maxId = Math.max(...alertsData.map(a => a.Id));
      const newAlert = {
        Id: maxId + 1,
        ...alertData,
        timestamp: new Date().toISOString()
      };
      
      alertsData.unshift(newAlert);
      return { ...newAlert };
    } catch (error) {
      throw new Error("Failed to create alert");
    }
  },

  async update(id, updateData) {
    await delay(350);
    
    try {
      const index = alertsData.findIndex(a => a.Id === parseInt(id));
      if (index === -1) {
        throw new Error("Alert not found");
      }
      
      alertsData[index] = { ...alertsData[index], ...updateData };
      return { ...alertsData[index] };
    } catch (error) {
      throw new Error("Failed to update alert");
    }
  },

  async delete(id) {
    await delay(250);
    
    try {
      const index = alertsData.findIndex(a => a.Id === parseInt(id));
      if (index === -1) {
        throw new Error("Alert not found");
      }
      
      const deletedAlert = alertsData.splice(index, 1)[0];
      return { ...deletedAlert };
    } catch (error) {
      throw new Error("Failed to delete alert");
    }
  },

  async dismiss(id) {
    return this.delete(id);
  }
};