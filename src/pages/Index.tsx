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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'sent_to_ai' | 'ai_responded' | 'sent_to_user';
  aiResponse?: string;
  processingTime?: number;
}

interface APIRequest {
  id: string;
  endpoint: string;
  method: string;
  body: any;
  timestamp: string;
  status: 'received' | 'processing' | 'completed' | 'error';
  response?: any;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiRequests, setApiRequests] = useState<APIRequest[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('sk-proj-***');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [systemPrompt, setSystemPrompt] = useState('Ты помощник службы поддержки. Отвечай кратко и полезно.');
  const [autoResponse, setAutoResponse] = useState(true);
  
  // Симуляция получения сообщений по API
  const simulateIncomingMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      message: [
        'Как оформить возврат товара?',
        'Проблема с оплатой картой',
        'Когда поступит заказ?',
        'Можно ли изменить адрес доставки?',
        'Где посмотреть статус заказа?'
      ][Math.floor(Math.random() * 5)],
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    setMessages(prev => [newMessage, ...prev]);
    
    // Симуляция API запроса
    const apiReq: APIRequest = {
      id: Date.now().toString(),
      endpoint: '/api/v1/messages',
      method: 'POST',
      body: {
        user_id: newMessage.userId,
        message: newMessage.message,
        widget_id: 'widget_123'
      },
      timestamp: new Date().toISOString(),
      status: 'received'
    };
    
    setApiRequests(prev => [apiReq, ...prev]);
    
    // Автоматическая обработка если включена
    if (autoResponse) {
      setTimeout(() => processMessage(newMessage.id), 1000);
    }
  };
  
  // Обработка сообщения и отправка к ИИ
  const processMessage = async (messageId: string) => {
    setIsProcessing(true);
    
    // Обновляем статус сообщения
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'processing' } : msg
    ));
    
    // Симуляция отправки к ИИ
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'sent_to_ai' } : msg
      ));
      
      // Симуляция ответа ИИ
      setTimeout(() => {
        const aiResponse = generateAIResponse(prev => prev.find(m => m.id === messageId)?.message || '');
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { 
            ...msg, 
            status: 'ai_responded', 
            aiResponse,
            processingTime: Math.floor(Math.random() * 3000) + 1000
          } : msg
        ));
        
        // Отправка ответа пользователю
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, status: 'sent_to_user' } : msg
          ));
          
          // Обновляем API запрос
          setApiRequests(prev => prev.map(req => 
            req.body.message === prev.find(m => m.id === messageId)?.message ? {
              ...req,
              status: 'completed',
              response: {
                message: aiResponse,
                processing_time: Math.floor(Math.random() * 3000) + 1000,
                model: selectedModel
              }
            } : req
          ));
          
          setIsProcessing(false);
        }, 500);
      }, 2000);
    }, 1000);
  };
  
  // Генерация ответа ИИ (симуляция)
  const generateAIResponse = (userMessage: string) => {
    const responses = {
      'возврат': 'Для оформления возврата обратитесь в службу поддержки с номером заказа. Возврат возможен в течение 14 дней.',
      'оплата': 'Проверьте правильность введенных данных карты. Если проблема не решена, обратитесь в банк.',
      'заказ': 'Статус заказа можно проверить в личном кабинете. Доставка занимает 3-5 рабочих дней.',
      'доставка': 'Адрес доставки можно изменить до момента отправки заказа в личном кабинете.',
      'статус': 'Для проверки статуса заказа войдите в личный кабинет или используйте трек-номер.'
    };
    
    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.toLowerCase().includes(key)) {
        return response;
      }
    }
    
    return 'Спасибо за обращение! Наш специалист свяжется с вами в ближайшее время.';
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'sent_to_ai': return 'bg-purple-100 text-purple-800';
      case 'ai_responded': return 'bg-green-100 text-green-800';
      case 'sent_to_user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'processing': return 'Обрабатывается';
      case 'sent_to_ai': return 'Отправлено к ИИ';
      case 'ai_responded': return 'ИИ ответил';
      case 'sent_to_user': return 'Отправлено пользователю';
      default: return 'Неизвестно';
    }
  };



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
              <h1 className="text-2xl font-bold text-foreground">ИИ-агент Сервер</h1>
              <p className="text-sm text-muted-foreground">Обработка сообщений и интеграция с ИИ</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Icon name="Zap" size={16} className="mr-1" />
              {isProcessing ? 'Обрабатывается' : 'Готов'}
            </Badge>
            <Button onClick={simulateIncomingMessage} className="bg-primary hover:bg-primary/90">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Симулировать сообщение
            </Button>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Сообщений обработано</CardTitle>
              <span className="text-2xl font-bold text-foreground">{messages.length}</span>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">API запросов</CardTitle>
              <span className="text-2xl font-bold text-foreground">{apiRequests.length}</span>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Среднее время ответа</CardTitle>
              <span className="text-2xl font-bold text-foreground">
                {messages.filter(m => m.processingTime).length > 0 ? 
                  `${Math.round(messages.filter(m => m.processingTime).reduce((acc, m) => acc + (m.processingTime || 0), 0) / messages.filter(m => m.processingTime).length / 1000)}s` : 
                  '0s'
                }
              </span>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Успешно обработано</CardTitle>
              <span className="text-2xl font-bold text-foreground">
                {messages.filter(m => m.status === 'sent_to_user').length}
              </span>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message Processing */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="messages">Сообщения</TabsTrigger>
                <TabsTrigger value="api">API Логи</TabsTrigger>
                <TabsTrigger value="config">Конфигурация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Обработка сообщений</h3>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Автоответ</Label>
                    <Switch checked={autoResponse} onCheckedChange={setAutoResponse} />
                  </div>
                </div>
                
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <Card key={message.id} className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-muted text-muted-foreground">
                                  {message.userId.slice(-2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm text-foreground">{message.userId}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(message.status)}>
                                {getStatusText(message.status)}
                              </Badge>
                              {message.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => processMessage(message.id)}
                                  disabled={isProcessing}
                                >
                                  <Icon name="Play" size={14} className="mr-1" />
                                  Обработать
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm text-foreground">
                                <strong>Пользователь:</strong> {message.message}
                              </p>
                            </div>
                            
                            {message.aiResponse && (
                              <div className="bg-primary/10 rounded-lg p-3">
                                <p className="text-sm text-foreground">
                                  <strong>ИИ-ответ:</strong> {message.aiResponse}
                                </p>
                                {message.processingTime && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Время обработки: {message.processingTime}мс
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {messages.length === 0 && (
                      <div className="text-center py-12">
                        <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">Нет сообщений</h3>
                        <p className="text-muted-foreground">Нажмите "Симулировать сообщение" для тестирования</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">API Логи</h3>
                
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {apiRequests.map((request) => (
                      <Card key={request.id} className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="font-mono">
                                {request.method}
                              </Badge>
                              <span className="text-sm font-medium text-foreground">
                                {request.endpoint}
                              </span>
                            </div>
                            <Badge 
                              className={
                                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                                request.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                request.status === 'error' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-muted-foreground">Request Body:</Label>
                              <pre className="bg-muted rounded p-2 text-xs text-foreground overflow-x-auto">
                                {JSON.stringify(request.body, null, 2)}
                              </pre>
                            </div>
                            
                            {request.response && (
                              <div>
                                <Label className="text-xs text-muted-foreground">Response:</Label>
                                <pre className="bg-primary/10 rounded p-2 text-xs text-foreground overflow-x-auto">
                                  {JSON.stringify(request.response, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(request.timestamp).toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {apiRequests.length === 0 && (
                      <div className="text-center py-12">
                        <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">Нет API запросов</h3>
                        <p className="text-muted-foreground">Логи будут появляться здесь после обработки сообщений</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="config" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Конфигурация ИИ</h3>
                
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Настройки модели</CardTitle>
                    <CardDescription>Параметры для обработки сообщений</CardDescription>
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
                      <Label className="text-foreground">Модель ИИ</Label>
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
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="bg-muted min-h-[100px]"
                        placeholder="Введите системный промпт..."
                      />
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить настройки
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* API Info & Status */}
          <div className="space-y-6">
            {/* API Endpoints */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Icon name="Code" size={20} />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Получение сообщений</Label>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="text-xs text-foreground">
                      POST /api/v1/messages
                    </code>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Отправка к ИИ</Label>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="text-xs text-foreground">
                      POST /api/v1/ai/process
                    </code>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Получение ответа</Label>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="text-xs text-foreground">
                      GET /api/v1/messages/{id}/response
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Processing Status */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Icon name="Activity" size={20} />
                  Статус обработки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Статус сервера</span>
                    <Badge className="bg-green-100 text-green-800">Активен</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">ИИ-модель</span>
                    <Badge variant="outline">{selectedModel}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Автоответ</span>
                    <Badge className={autoResponse ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {autoResponse ? 'Включен' : 'Выключен'}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <Alert>
                    <Icon name="Info" size={16} />
                    <AlertDescription className="text-sm">
                      Сервер готов к получению сообщений по API и их обработке через ИИ-агента.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
            
            {/* Example Request */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Пример запроса
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">cURL</Label>
                  <pre className="bg-muted rounded-lg p-3 text-xs text-foreground overflow-x-auto">
{`curl -X POST https://api.server.com/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "user_id": "user_123",
    "message": "Как оформить возврат?",
    "widget_id": "widget_456"
  }'`}
                  </pre>
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