import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isWidgetActive, setIsWidgetActive] = useState(true);
  const [apiKey, setApiKey] = useState('sk-proj-...');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  
  const mockAnalytics = {
    totalChats: 1247,
    activeWidgets: 5,
    avgResponseTime: '2.3s',
    satisfactionRate: 92
  };

  const mockWidgets = [
    {
      id: 1,
      name: 'Поддержка клиентов',
      domain: 'example.com',
      status: 'active',
      chats: 234,
      lastActivity: '2 мин назад'
    },
    {
      id: 2,
      name: 'Продажи',
      domain: 'shop.example.com',
      status: 'inactive',
      chats: 89,
      lastActivity: '1 час назад'
    },
    {
      id: 3,
      name: 'Техподдержка',
      domain: 'support.example.com',
      status: 'active',
      chats: 156,
      lastActivity: '5 мин назад'
    }
  ];

  const mockChats = [
    {
      id: 1,
      user: 'Анна К.',
      message: 'Как оформить возврат товара?',
      time: '14:23',
      status: 'resolved'
    },
    {
      id: 2,
      user: 'Михаил С.',
      message: 'Проблема с оплатой картой',
      time: '14:18',
      status: 'active'
    },
    {
      id: 3,
      user: 'Елена В.',
      message: 'Когда поступит товар?',
      time: '14:12',
      status: 'pending'
    }
  ];

  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Widget Management Server</h1>
              <p className="text-sm text-muted-foreground">Управление ИИ-чат виджетами</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Icon name="Zap" size={16} className="mr-1" />
            Активен
          </Badge>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего чатов</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{mockAnalytics.totalChats}</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  +12%
                </Badge>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Активные виджеты</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{mockAnalytics.activeWidgets}</span>
                <Icon name="TrendingUp" size={16} className="text-primary" />
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Время ответа</CardTitle>
              <span className="text-2xl font-bold text-foreground">{mockAnalytics.avgResponseTime}</span>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Удовлетворенность</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{mockAnalytics.satisfactionRate}%</span>
                <Icon name="Heart" size={16} className="text-primary" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Widget Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="widgets" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="widgets">Виджеты</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="widgets" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Управление виджетами</h3>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить виджет
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mockWidgets.map((widget) => (
                    <Card key={widget.id} className="bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <Icon name="Bot" size={20} className="text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{widget.name}</h4>
                              <p className="text-sm text-muted-foreground">{widget.domain}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={widget.status === 'active' ? 'default' : 'secondary'}
                              className={widget.status === 'active' ? 'bg-primary text-primary-foreground' : ''}
                            >
                              {widget.status === 'active' ? 'Активен' : 'Неактивен'}
                            </Badge>
                            <div className="text-right text-sm">
                              <p className="text-foreground font-medium">{widget.chats} чатов</p>
                              <p className="text-muted-foreground">{widget.lastActivity}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">API Configuration</h3>
                  
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">API Endpoints</CardTitle>
                      <CardDescription>Используйте эти endpoints для интеграции</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">Widget API</Label>
                        <div className="flex gap-2">
                          <Input 
                            value="https://api.widgetserver.com/v1/widget" 
                            readOnly 
                            className="bg-muted"
                          />
                          <Button variant="outline" size="sm">
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Chat API</Label>
                        <div className="flex gap-2">
                          <Input 
                            value="https://api.widgetserver.com/v1/chat" 
                            readOnly 
                            className="bg-muted"
                          />
                          <Button variant="outline" size="sm">
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Analytics API</Label>
                        <div className="flex gap-2">
                          <Input 
                            value="https://api.widgetserver.com/v1/analytics" 
                            readOnly 
                            className="bg-muted"
                          />
                          <Button variant="outline" size="sm">
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Настройки ИИ-агента</h3>
                  
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Конфигурация модели</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">API Key</Label>
                        <Input 
                          type="password" 
                          value={apiKey} 
                          onChange={(e) => setApiKey(e.target.value)}
                          className="bg-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Модель</Label>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                          <SelectTrigger className="bg-muted">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Системный промпт</Label>
                        <Textarea 
                          placeholder="Введите системный промпт для ИИ-агента..."
                          className="bg-muted min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground">Автоответы</Label>
                        <Switch checked={isWidgetActive} onCheckedChange={setIsWidgetActive} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Widget Preview & Recent Chats */}
          <div className="space-y-6">
            {/* Widget Preview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Icon name="Eye" size={20} />
                  Превью виджета
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4">
                  <div className="bg-background rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">ИИ-ассистент</p>
                        <p className="text-xs text-muted-foreground">в сети</p>
                      </div>
                    </div>
                    <Separator className="mb-3" />
                    <div className="space-y-2">
                      <div className="bg-muted rounded-lg p-2">
                        <p className="text-sm text-foreground">Здравствуйте! Чем могу помочь?</p>
                      </div>
                      <div className="bg-primary rounded-lg p-2 ml-4">
                        <p className="text-sm text-primary-foreground">Как оформить заказ?</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <p className="text-sm text-foreground">Для оформления заказа перейдите в каталог...</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Input placeholder="Введите сообщение..." className="text-sm" />
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Chats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Последние чаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockChats.map((chat) => (
                    <div key={chat.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {chat.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-foreground">{chat.user}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                        <Badge 
                          variant="secondary" 
                          className={`mt-1 text-xs ${
                            chat.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            chat.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {chat.status === 'resolved' ? 'Решен' : 
                           chat.status === 'active' ? 'Активен' : 'Ожидает'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;